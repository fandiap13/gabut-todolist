// // Helper function to format date to YYYY-MM-DD
// export const formatDate = (date: string) => {
//   if (!date) return null; // Handle null or undefined date
//   const d = new Date(date);
//   const year = d.getFullYear();
//   const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are zero-based
//   const day = String(d.getDate()).padStart(2, "0");
//   return `${year}-${month}-${day}`;
// };

// // Helper function to format time to HH:mm
// export const formatTime = (date: string) => {
//   if (!date) return null; // Handle null or undefined date
//   const d = new Date(date);
//   const hours = String(d.getHours()).padStart(2, "0");
//   const minutes = String(d.getMinutes()).padStart(2, "0");
//   return `${hours}:${minutes}`;
// };
// Helper function to format date to YYYY-MM-DD
export const formatDate = (date: Date | string) => {
  if (!date) return null; // Handle null or undefined date
  const dateString = date instanceof Date ? date.toISOString() : date; // Convert Date object to ISO string if necessary
  return dateString.split("T")[0]; // Get the date part
};

// Helper function to format time to HH:mm
export const formatTime = (date: Date | string) => {
  if (!date) return null; // Handle null or undefined date
  const dateString = date instanceof Date ? date.toISOString() : date; // Convert Date object to ISO string if necessary
  return dateString.split("T")[1].split(".")[0]; // Get the time part
};
