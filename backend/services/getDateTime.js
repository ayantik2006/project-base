exports.getDateTime = () => {
  const now = new Date();
  let day = String(now.getDate()).padStart(2, "0");
  let month = String(now.getMonth() + 1).padStart(2, "0");
  let year = now.getFullYear();

  let hour = now.getHours();
  const minute = String(now.getMinutes()).padStart(2, "0");

  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12; // convert to 12-hour format

  const dateTime = `${day}/${month}/${year}, ${hour}:${minute} ${ampm}`;
  return dateTime;
};
