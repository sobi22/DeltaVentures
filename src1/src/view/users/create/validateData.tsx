export let validateCustomerData = (data: any) => {
    const isErrorData = {
      mobileNumber: !data.mobileNumber?.trim() || !/^\d{8,15}$/.test(data.mobileNumber),
      customerName: !data.customerName?.trim(),
    };
  
    return isErrorData;
  };
  export let ValidationAddresFunction = (data: any) => {
    return data.map((val: any) => ({
      ...val,
      addressLine1Error: !val.addressLine1?.trim(),
      streetNameError: !val.streetName?.trim(),
      districtError: !val.district?.trim(),
      stateError: !val.state?.trim(),
      stateCodeError: !val.stateCode?.trim(),
      zipCodeError: !val.zipCode || val.zipCode.length < 6 || val.zipCode.length > 10,
      countryError: !val.country?.trim(),
      locationError: !val.location?.trim(),
    }));
  };
  