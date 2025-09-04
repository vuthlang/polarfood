interface Address {
  streetNumber?: string;
  streetName?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  fullAddress?: string;
  lat?: number;
  lng?: number;
};

export function parseAddress(details: any): Address {
  const components = details?.address_components || [];

  const getComponent = (type: string) =>
    components.find((c: any) => c.types.includes(type))?.long_name || "";

  return {
    streetNumber: getComponent("street_number"),
    streetName: getComponent("route"),
    city: getComponent("locality") || getComponent("postal_town"),
    postalCode: getComponent("postal_code"),
    country: getComponent("country"),
    lat: details?.geometry?.location?.lat,
    lng: details?.geometry?.location?.lng,
    fullAddress: details?.formatted_address || "",
  };
}