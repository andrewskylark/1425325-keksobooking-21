'use strict';
(() => {
  const LOW_PRICE = 10000;
  const HIGH_PRICE = 50000;
  const mapFilters = document.querySelector(`.map__filters`);
  const filterSelects = mapFilters.querySelectorAll(`select`);
  const selectRooms = mapFilters.querySelector(`#housing-rooms`);
  const selectGuests = mapFilters.querySelector(`#housing-guests`);
  const selectHousingType = mapFilters.querySelector(`#housing-type`);
  const selectPrice = mapFilters.querySelector(`#housing-price`);
  const selectFeatures = mapFilters.querySelector(`#housing-features`);

  const disableFilters = () => {
    for (let filterSelect of filterSelects) {
      filterSelect.disabled = true;
    }
    mapFilters.querySelector(`fieldset.map__features`).disabled = true;
    mapFilters.classList.add(`map__filters--disabled`);
    mapFilters.style.opacity = 0;
    mapFilters.reset();
  };
  const enableFilters = () => {
    for (let filterSelect of filterSelects) {
      filterSelect.disabled = false;
    }
    mapFilters.querySelector(`fieldset.map__features`).disabled = false;
    mapFilters.classList.remove(`map__filters--disabled`);
    mapFilters.style.opacity = 1;
  };

  mapFilters.addEventListener(`change`, window.debounce(() => {
    window.card.removeCard();

    const housingTypePins = window.pinsData.store.filter((pin) => {

      if (selectHousingType.value === `any`) {
        return window.pinsData.store;
      } else {
        return pin.offer.type === selectHousingType.value;
      }
    });
    const pricePins = housingTypePins.filter((pin) => {

      if (selectPrice.value === `any`) {
        return housingTypePins;
      } else if (selectPrice.value === `low`) {
        return pin.offer.price < LOW_PRICE;
      } else if (selectPrice.value === `middle`) {
        return pin.offer.price >= LOW_PRICE && pin.offer.price <= HIGH_PRICE;
      } else if (selectPrice.value === `high`) {
        return pin.offer.price > HIGH_PRICE;
      } else {
        return false;
      }
    });
    const roomsPins = pricePins.filter((pin) => {

      if (selectRooms.value === `any`) {
        return pricePins;
      } else {
        return pin.offer.rooms === parseInt(selectRooms.value, 10);
      }
    });
    const guestsPins = roomsPins.filter((pin) => {

      if (selectGuests.value === `any`) {
        return roomsPins;
      } else {
        return pin.offer.guests === parseInt(selectGuests.value, 10);
      }
    });
    const featuresPins = guestsPins.filter((pin) => {

      const checkedFeatures = selectFeatures.querySelectorAll(`input[type="checkbox"]:checked`);
      let checkedFeaturesValues = [];

      for (let checkedFeature of checkedFeatures) {
        checkedFeaturesValues.push(checkedFeature.value);
      }

      const filteredFeatures = checkedFeaturesValues.every((value) => {
        return pin.offer.features.includes(value);
      });

      return filteredFeatures;

    });

    window.map.updatePins(featuresPins);

  }));

  window.filters = {
    enableFilters,
    disableFilters
  };
})();
