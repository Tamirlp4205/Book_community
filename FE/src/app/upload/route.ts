import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export const upload = async (file: File): Promise<string> => {
  const storage = getStorage();

  // Create the file metadata
  const metadata = {
    contentType: file.type // Set contentType dynamically based on the file type
  };

  // Create a reference to the file to be uploaded
  const storageRef = ref(storage, `images/${Date.now()}_${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);

  return new Promise((resolve, reject) => {
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // Handle various upload errors
        switch (error.code) {
          case 'storage/unauthorized':
            console.error("User doesn't have permission to access the object");
            break;
          case 'storage/canceled':
            console.log('User canceled the upload');
            break;
          case 'storage/unknown':
            console.error('Unknown error occurred:', error.serverResponse);
            break;
          default:
            console.error('Upload failed:', error);
            break;
        }
        reject(error); // Reject the promise on error
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            console.log('File available at', downloadURL);
            resolve(downloadURL); // Resolve with the download URL
          })
          .catch((error) => {
            console.error('Error getting download URL:', error);
            reject(error); // Reject if there's an error getting the URL
          });
      }
    );
  });
};

export default upload;
