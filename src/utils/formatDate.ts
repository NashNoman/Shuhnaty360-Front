export const formatDate = (dateString: string | null) => {
  if (!dateString) return "";
  return dateString.split(" ")[0];
};
