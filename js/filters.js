'use strict';
(() => {
  const mapFilters = document.querySelector(`.map__filters`);
  const selectRooms = mapFilters.querySelector(`#housing-rooms`);
  const selectGuests = mapFilters.querySelector(`#housing-guests`);
  const selectHousingType = mapFilters.querySelector(`#housing-type`);

  const disableFilters = () => {
    mapFilters.classList.add(`map__filters--disabled`);
    mapFilters.style.opacity = 0;
  };
  const enableFilters = () => {
    mapFilters.classList.remove(`map__filters--disabled`);
    mapFilters.style.opacity = 1;
  };
  mapFilters.addEventListener(`change`, () => {
    window.card.removeCard();

    const guestN = (N) => {
      return selectGuests.querySelector(`[value="${N}"]`);
    };

    if (selectRooms.value === `1`) {
      guestN(1).selected = true;
      guestN(0).disabled = true;
      guestN(2).disabled = true;
      guestN(3).disabled = true;
      guestN(`any`).disabled = true;
    }
    if (selectRooms.value === `2`) {
      guestN(2).selected = true;
      guestN(2).disabled = false;
      guestN(3).disabled = true;
      guestN(0).disabled = true;
      guestN(`any`).disabled = true;
    } else if (selectRooms.value === `3`) {
      guestN(3).selected = true;
      guestN(3).disabled = false;
      guestN(2).disabled = false;
      guestN(1).disabled = false;
      guestN(0).disabled = true;
      guestN(`any`).disabled = true;
    } else if (selectRooms.value === `100`) {
      guestN(0).selected = true;
      guestN(0).disabled = false;
      guestN(1).disabled = true;
      guestN(2).disabled = true;
      guestN(3).disabled = true;
      guestN(`any`).disabled = true;
    }
  });
  selectHousingType.addEventListener(`change`, () => {
    window.pin.removePins();

    if (selectHousingType.value === `any`) {
      window.map.updatePins(window.pinsData.store);
    } else {
      const housingTypePins = window.pinsData.store.filter((pin) => {
        return pin.offer.type === selectHousingType.value;
      });

      window.map.updatePins(housingTypePins);
    }
  });

  window.filters = {
    enableFilters,
    disableFilters
  };
})();
