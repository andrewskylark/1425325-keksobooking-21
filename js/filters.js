'use strict';
(() => {
  const mapFilters = document.querySelector(`.map__filters`);
  const selectRooms = mapFilters.querySelector(`#housing-rooms`);
  const selectGuests = mapFilters.querySelector(`#housing-guests`);
  const selectHousingType = mapFilters.querySelector(`#housing-type`);
  const selectPrice = mapFilters.querySelector(`#housing-price`);
  const selectFeatures = mapFilters.querySelector(`#housing-features`);

  const disableFilters = () => {
    mapFilters.classList.add(`map__filters--disabled`);
    mapFilters.style.opacity = 0;
  };
  const enableFilters = () => {
    mapFilters.classList.remove(`map__filters--disabled`);
    mapFilters.style.opacity = 1;
  };
  // mapFilters.addEventListener(`change`, () => {
  //   window.card.removeCard();

  //   const guestN = (N) => {
  //     return selectGuests.querySelector(`[value="${N}"]`);
  //   };

  //   if (selectRooms.value === `1`) {
  //     guestN(1).selected = true;
  //     guestN(0).disabled = true;
  //     guestN(2).disabled = true;
  //     guestN(3).disabled = true;
  //     guestN(`any`).disabled = true;
  //   }
  //   if (selectRooms.value === `2`) {
  //     guestN(2).selected = true;
  //     guestN(2).disabled = false;
  //     guestN(3).disabled = true;
  //     guestN(0).disabled = true;
  //     guestN(`any`).disabled = true;
  //   } else if (selectRooms.value === `3`) {
  //     guestN(3).selected = true;
  //     guestN(3).disabled = false;
  //     guestN(2).disabled = false;
  //     guestN(1).disabled = false;
  //     guestN(0).disabled = true;
  //     guestN(`any`).disabled = true;
  //   } else if (selectRooms.value === `100`) {
  //     guestN(0).selected = true;
  //     guestN(0).disabled = false;
  //     guestN(1).disabled = true;
  //     guestN(2).disabled = true;
  //     guestN(3).disabled = true;
  //     guestN(`any`).disabled = true;
  //   }
  // });
  mapFilters.addEventListener(`change`, (evt) => {
    window.pin.removePins();

    const housingTypePins = window.pinsData.store.filter((pin) => {
      return pin.offer.type === selectHousingType.value;
    });
    console.log(housingTypePins);
    const pricePins = window.pinsData.store.filter((pin) => {
      if (selectPrice.value === `low`) {
        return pin.offer.price < 10000;
      } else if (selectPrice.value === `middle`) {
        return pin.offer.price >= 10000 && pin.offer.price <= 50000;
      } else if (selectPrice.value === `high`) {
        return pin.offer.price > 50000;
      }
    });
    console.log(pricePins);
    const roomsPins = window.pinsData.store.filter((pin) => {
      console.log(pin.offer.rooms);
      console.log(selectRooms.value);
      return pin.offer.rooms === selectRooms.value;

    });
    console.log(roomsPins);
    const guestsPins = window.pinsData.store.filter((pin) => {
      return pin.offer.guests === selectGuests.value;
    });
    console.log(guestsPins);
    // const featuresPins = window.pinsData.store.filter((pin) => {
    //  if (evt.target.matches(`input[type="checkbox"]`)) {
    //   console.log(evt.target.value);
    //    return pin.offer.features.some(evt.target.value) === evt.target.value;
    //  };
    // });
    // console.log(featuresPins);
    // window.map.updatePins(guestsPins);

  });

  window.filters = {
    enableFilters,
    disableFilters
  };
})();
