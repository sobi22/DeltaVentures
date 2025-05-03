  export let validatePhoneNumber = (phoneNumber: any) => {
    if (!phoneNumber) return;
    return /^(\+\d{1,3}\s?)?(\d{10})$/.test(phoneNumber);
  };
  export  let validateEmail=(email:any) => {
    if (!email) return;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  