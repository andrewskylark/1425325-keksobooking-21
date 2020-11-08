'use strict';
const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

const avatarFileChooser = document.querySelector(`.ad-form__field input[type=file]`);
const avatarPreview = document.querySelector(`.ad-form-header__preview img`);
const photoFileChooser = document.querySelector(`.ad-form__upload input[type=file]`);
const photoPreviewContainer = document.querySelector(`.ad-form__photo`);

const onPreviewUpload = (fileName, file, preview) => {
  const matches = FILE_TYPES.some((that) => {
    return fileName.endsWith(that);
  });

  if (matches) {
    const fileReader = new FileReader();

    fileReader.addEventListener(`load`, () => {
      preview.src = fileReader.result;
    });
    fileReader.readAsDataURL(file);
  }
};

avatarFileChooser.addEventListener(`change`, () => {
  const file = avatarFileChooser.files[0];
  const fileName = file.name.toLowerCase();

  onPreviewUpload(fileName, file, avatarPreview);
});
photoFileChooser.addEventListener(`change`, () => {
  const file = photoFileChooser.files[0];
  const fileName = file.name.toLowerCase();
  // очищает содержимое дива
  photoPreviewContainer.innerHTML = ``;

  const photoPreview = document.createElement(`img`);

  photoPreview.setAttribute(`src`, ``);
  photoPreview.setAttribute(`alt`, `фото жилья`);
  photoPreview.setAttribute(`width`, `100%`);
  photoPreview.setAttribute(`height`, `100%`);
  photoPreviewContainer.appendChild(photoPreview);

  onPreviewUpload(fileName, file, photoPreview);
});

const clear = () => {
  photoPreviewContainer.innerHTML = ``;
  avatarPreview.setAttribute(`src`, `img/muffin-grey.svg`);
};

window.previews = {
  clear
};
