import { AsyncStorage}  from 'react-native';
export default async function API(url, method, body) {
  const token = await AsyncStorage.getItem("@user_at");
  const fetchURL = url.trim();
  var Fetch_body = null;
  if (body != null) {
    Fetch_body = body.trim();
  }
  const fetchConfig = {
    method: method,
    headers: {
      access_token: token,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: Fetch_body
  };
  //console.log(fetchURL, fetchConfig);
  const res = await fetch(
    `http://staging.php-dev.in:8844/trainingapp/api/${fetchURL}`,
    fetchConfig
  );
  return await res.json();
}