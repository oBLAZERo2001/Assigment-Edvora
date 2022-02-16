export async function getProduct() {
  return await fetch("https://assessment-edvora.herokuapp.com/")
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
}
