'use strict';
(() => {
  const selectRooms = window.consts.mapFilters.querySelector(`#housing-rooms`);
  const selectGuests = window.consts.mapFilters.querySelector(`#housing-guests`);

  const disableFilters = () => {
    window.consts.mapFilters.classList.add(`map__filters--disabled`);
  };
  const enableFilters = () => {
    window.consts.mapFilters.classList.remove(`map__filters--disabled`);
  };
  window.consts.mapFilters.addEventListener(`change`, () => {
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
  window.filters = {
    enableFilters,
    disableFilters
  };
})();
