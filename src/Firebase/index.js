import {storage} from "../firebase.config";
import {getDownloadURL, ref, uploadBytesResumable,} from "firebase/storage";

import {MdOutlineCloudUpload} from "react-icons/md";
import {toast} from "react-toastify";

export const firebaseUploadImage = (
    imageFile,
    promise,
    progressHandler,
    action,
    to
) => {
    promise(true);
    toast.info(`Upload started.....`, {
        icon: <MdOutlineCloudUpload className="text-blue-600"/>,
    });
    const storageRef = ref(
        storage,
        `Images/${to}/${Date.now()}-${imageFile.name}`
    );
    const uploadPhoto = uploadBytesResumable(storageRef, imageFile);
    uploadPhoto.on(
        "state_changed",
        (snapshot) => {
            progressHandler(
                `Upload status: ${Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                )}%`
            );
        },
        (error) => {
            console.log(error);
            toast.error("Error while uploading, Try again🤗");
            action(null);
            setTimeout(() => {
                promise(false);
            }, 3000);
        },
        () => {
            getDownloadURL(uploadPhoto.snapshot.ref).then((downloadUrl) => {
                action(downloadUrl);
                promise(false);
                toast.success("Photo Uploaded Successfully😊");
            });
        }
    );
};

