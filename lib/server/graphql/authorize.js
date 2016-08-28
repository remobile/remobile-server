export default function authorize (root) {
  if (!root.administrator) {
    // throw new Error('Unauthorized');
    console.log('Unauthorized');
  }
}
