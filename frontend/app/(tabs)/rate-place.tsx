import GooglePlacesInput from "@/components/ui/GooglePlacesInput";
import { parseAddress } from "@/utils/parseAddress";
import { LinearGradient } from "expo-linear-gradient";
import { RatingSliderInput } from "../../components/ui/RatingSlider";
import { MultiSelect } from "../../components/ui/MultiSelect";
import { SingleSelect } from "../../components/ui/SingleSelect";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { CommentInput } from "../../components/ui/CommentInput"
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { PlaceService, Place } from "../../services/placeService";
import { VisitService } from "@/services/visitService";
import { getUserIdFromToken } from '../../utils/tokenManager';

interface PlaceData {
  id: any;
  description: string;
  place_id: string;
  structured_formatting?: {
    main_text: string;
    secondary_text: string;
  };
};

interface PlaceDetails {
  name: string;
  formatted_address: string;
  geometry: {
    location: { lat: number; lng: number };
  };
  types?: string[];
};

interface RatingFormData {
  place: PlaceData | null;
  rating: number;
  placeType: string;
  categories: string[];
  comment: string;
  // Ajout des champs pour l’envoi au backend
  name?: string;
  address?: string;
  postalCode?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
}

const CATEGORIES = [
  'Brunch', 'Végétarien', 'Vegan', 'Sans gluten', 'Halal', 'Casher',
  'Fruits de mer', 'Viande', 'Pizza', 'Sushi', 'Indien', 'Chinois',
  'Italien', 'Français', 'Mexicain', 'Thaï', 'Libanais', 'Japonais',
  'Romantique', 'Familial', 'Terrasse', 'Vue', 'Livraison', 'À emporter'
];

const PLACE_TYPES = [
  { id: "restaurant", label: "Restaurant", icon: "restaurant" },
  { id: "bar", label: "Bar", icon: "beer" },
  { id: "cafe", label: "Café", icon: "cafe" },
  { id: "fast_food", label: "Fast Food", icon: "fast-food" },
  { id: "bakery", label: "Boulangerie", icon: "storefront" },
];

export default function AddRating() {
  const [isLoading, setIsLoading] = useState(false);
  const [places, setPlaces] = useState<Place[]>([]);

  const [formData, setFormData] = useState<RatingFormData>({
    place: null,
    rating: 5,
    placeType: '',
    categories: [],
    comment: '',
  });

  useEffect(() => {
    fetchPlaces();
  }, []);

  const fetchPlaces = async () => {
    try {
      const data = await PlaceService.getPlaces();
      setPlaces(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    if (!formData.place) {
      Alert.alert('Erreur', 'Veuillez sélectionner un lieu');
      return;
    }
    if (!formData.placeType) {
      Alert.alert('Erreur', 'Veuillez sélectionner le type d\'endroit');
      return;
    }

    setIsLoading(true);
    try {
      let placeId: number;
      const userId = await getUserIdFromToken();

      if (!userId) {
        Alert.alert('Erreur', 'Utilisateur non connecté');
        return;
      }

      if (!formData.place.id) {
        const newPlace = {
          name: formData.name!,
          address: formData.address!,
          postalCode: formData.postalCode!,
          city: formData.city!,
          latitude: formData.latitude!,
          longitude: formData.longitude!,
          placeType: formData.placeType,
          description: formData.comment,
          categories: formData.categories,
        };
        const createdPlace = await PlaceService.create(newPlace);
        placeId = createdPlace[0].id;
      } else {
        placeId = formData.place.id;
      }

      const existingVisit = await VisitService.findByUserAndPlace(userId, placeId);
      if (existingVisit) {
        Alert.alert('Erreur', 'Vous avez déjà noté ce lieu');
        setIsLoading(false);
        return;
      }

      await VisitService.create({
        userId,
        placeId,
        visitDate: new Date(),
        globalRating: formData.rating,
        comment: formData.comment,
      });

      Alert.alert(
        'Évaluation ajoutée !',
        `Merci d'avoir noté ${formData.name} avec ${formData.rating}/10 !`,
        [{ text: 'Continuer', onPress: () => router.back() }]
      );
    } catch (error) {
      console.error(error);
      Alert.alert('Erreur', 'Une erreur est survenue lors de l\'envoi');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlaceSelected = (data: PlaceData, details: PlaceDetails | null) => {
    if (details) {
      const address = parseAddress(details);

      setFormData(prev => ({
        ...prev,
        place: data,
        name: details.name,
        address: `${address.streetNumber} ${address.streetName}`,
        postalCode: address.postalCode,
        city: address.city,
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng,
      }));
    } else {
      setFormData(prev => ({ ...prev, place: data }));
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient colors={['#F8FAFC', '#E2E8F0']} style={styles.gradient}>
        <View className="pt-12 pb-6 px-5">
          <View className="flex-row items-center justify-between">
            <TouchableOpacity
              onPress={() => router.back()}
              className="w-10 h-10 bg-white/70 rounded-full items-center justify-center"
            >
              <Ionicons name="arrow-back" size={20} color="#475569" />
            </TouchableOpacity>
            <Text className="text-xl font-bold text-slate-700">Noter un lieu</Text>
            <View className="w-10" />
          </View>
        </View>

        <KeyboardAwareScrollView
          contentContainerStyle={{ paddingBottom: 40 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="bg-white mx-4 rounded-2xl p-6 shadow-sm">
            <Text className="text-lg font-semibold text-gray-800 mb-3">
              🔍 Lieu
            </Text>

            <GooglePlacesInput onPlaceSelected={handlePlaceSelected} />
            {formData.place && (
              <View className="mt-3 p-3 bg-gray-100 rounded-xl flex-row justify-between items-center">
                <View>
                  <Text className="font-medium text-gray-800">
                    {formData.name}
                  </Text>
                  {formData.address && (
                    <Text className="text-sm text-gray-600">
                      {formData.address}, {formData.city} {formData.postalCode}
                    </Text>
                  )}
                </View>
                <TouchableOpacity onPress={() => setFormData(prev => ({ ...prev, place: null }))}>
                  <Ionicons name="close-circle" size={24} color="#cbd5e1" />
                </TouchableOpacity>
              </View>
            )}

            <View className="mt-6 w-full">
              <RatingSliderInput
                value={formData.rating}
                onChange={(rating) => setFormData(prev => ({ ...prev, rating }))}
                max={10}
              />
            </View>

            <SingleSelect
              label="🏪 Type d'endroit"
              options={PLACE_TYPES}
              selected={formData.placeType}
              onChange={(id) => setFormData((prev) => ({ ...prev, placeType: id }))}
            />

            <MultiSelect
              label="🏷️ Catégories"
              options={CATEGORIES}
              selected={formData.categories}
              onChange={(categories) => setFormData((prev) => ({ ...prev, categories }))}
              optional
            />

            <CommentInput
              value={formData.comment}
              onChange={(text) => setFormData((prev) => ({ ...prev, comment: text }))}
              style="my-3"
            />

            <TouchableOpacity
              onPress={handleSubmit}
              disabled={isLoading || !formData.place || !formData.placeType}
              className={`rounded-xl py-4 ${isLoading || !formData.place || !formData.placeType
                ? 'bg-gray-400 opacity-70'
                : 'bg-slate-700'
                }`}
            >
              <View className="flex-row items-center justify-center">
                {isLoading ? (
                  <Text className="text-white text-lg font-bold">Publication en cours...</Text>
                ) : (
                  <>
                    <Text className="text-white text-lg font-bold mr-2">Publier mon avis</Text>
                    <Ionicons name="send" size={20} color="#fff" />
                  </>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </LinearGradient >
    </View >
  )
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
});
