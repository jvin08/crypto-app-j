export const formatDateAndTime = (hoursFromNow: number) => {
    const currentTime = new Date();
    const pastTime = new Date(currentTime.getTime() - hoursFromNow * 60 * 60 * 1000);
    const month = String(pastTime.getMonth() + 1).padStart(2, "0");
    const day = String(pastTime.getDate()).padStart(2, "0");
    const hour = String(pastTime.getHours()).padStart(2, "0");
    const formattedDateTime = `${month}/${day}, ${hour}:00`;
    return formattedDateTime;
  };