
import { launchCamera, launchImageLibrary, ImagePickerResponse, MediaType } from 'react-native-image-picker';

export async function selectFromGallery(): Promise<void> {
  const options: { mediaType: MediaType } = { mediaType: 'photo' };

  try {
    const response: ImagePickerResponse = await new Promise((resolve, reject) => {
      launchImageLibrary(options, (result: ImagePickerResponse) => {
        if (result.errorCode) {
          reject(new Error(result.errorMessage));
        } else {
          resolve(result);
        }
      });
    });

    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.assets && response.assets.length > 0) {
      const source = { uri: response.assets[0].uri };
      console.log('Selected Image: ', source);
      // Update the profile picture with the selected image
    } else {
      console.error('Unexpected response from image picker:', response);
    }
  } catch (error) {
    console.error('Error selecting image from gallery:', error);
  }
}

export async function takePicture(): Promise<void> {
  const options: { mediaType: MediaType } = { mediaType: 'photo' };

  try {
    const response: ImagePickerResponse = await new Promise((resolve, reject) => {
      launchCamera(options, (result: ImagePickerResponse) => {
        if (result.errorCode) {
          reject(new Error(result.errorMessage));
        } else {
          resolve(result);
        }
      });
    });

    if (response.didCancel) {
      console.log('User cancelled camera');
    } else if (response.assets && response.assets.length > 0) {
      const source = { uri: response.assets[0].uri };
      console.log('Captured Image: ', source);
      // Update the profile picture with the captured image
    } else {
      console.error('Unexpected response from camera:', response);
    }
  } catch (error) {
    console.error('Error taking picture:', error);
  }
}
