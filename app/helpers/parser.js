export const getServerURL = () => {
  let url = location.origin + "";
  let urlParseArray = url.split(".");
  let i;
  let returnUrl;

  if(url.indexOf("salesforce") != -1)
    {
      returnUrl = url.substring(0, url.indexOf("salesforce")) + "salesforce.com";
      return returnUrl;
    }

  if(url.indexOf("cloudforce") != -1)
    {
      returnUrl = url.substring(0, url.indexOf("cloudforce")) + "cloudforce.com";
      return returnUrl;
    }

  if(url.indexOf("visual.force") != -1)
    {
      returnUrl = 'https://' + urlParseArray[1] + '';
      return returnUrl;
    }
  return returnUrl;
};
