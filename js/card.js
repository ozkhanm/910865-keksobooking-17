'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var serverData = window.keksobooking.pin.serverData;

  /**
   * Функция отрисовывает изображения в карточке
   */
  var renderImages = function () {
    var images = serverData.response[0].offer.photos;
    var imgTemplate = cardTemplate.querySelector('.popup__photo');
    var nodes = document.createDocumentFragment();
    var imgContainer = document.querySelector('.popup__photos');

    imgContainer.removeChild(document.querySelector('.popup__photo'));

    for (var i = 0; i < images.length; i++) {
      var imgModel = imgTemplate.cloneNode(true);

      imgModel.src = images[i];
      nodes.appendChild(imgModel);
    }

    imgContainer.appendChild(nodes);
  };

  /**
   * Функция присваивает стиль отображения блока карточкам
   * @param {String} feature
   */
  var setDisplayStyle = function (feature) {
    document.querySelector('.popup__feature--' + feature).style = 'display: inline-block';
  };

  var renderFeature = function () {
    var features = document.querySelectorAll('.popup__feature');

    features.forEach(function (it) {
      it.style = 'display: none';
    });

    for (var i = 0; i < serverData.response[0].offer.features.length; i++) {
      setDisplayStyle(serverData.response[0].offer.features[i]);
    }
  };

  /**
   * @return {Node}
   */
  var renderCard = function () {
    var cardModel = cardTemplate.cloneNode(true);
    // var mapPins = document.querySelector('.map__pins');

    window.selectors.mapPins.appendChild(cardModel);

    return cardModel;
  };

  /**
   * @param {HTMLElement} cardModel
   */
  var fillInCardData = function (cardModel) {
    var offerType = '';

    switch (serverData.response[0].offer.type) {
      case 'flat':
        offerType = 'Квартира';
        break;

      case 'bungalo':
        offerType = 'Бунгало';
        break;

      case 'house':
        offerType = 'Дом';
        break;

      case 'palace':
        offerType = 'Дворец';
        break;
    }

    cardModel.querySelector('.popup__title').textContent = serverData.response[0].offer.title;
    cardModel.querySelector('.popup__text--address').textContent = serverData.response[0].offer.address;
    cardModel.querySelector('.popup__text--price').textContent = serverData.response[0].offer.price + '₽/ночь';
    cardModel.querySelector('.popup__type').textContent = offerType;
    cardModel.querySelector('.popup__text--capacity').textContent = serverData.response[0].offer.rooms + ' комнаты для ' + serverData.response[0].offer.guests + ' гостей';
    cardModel.querySelector('.popup__text--time').textContent = 'Заезд после ' + serverData.response[0].offer.checkin + ', ' + 'выезд до ' + serverData.response[0].offer.checkout;
    renderFeature();
    cardModel.querySelector('.popup__description').textContent = serverData.response[0].offer.description;
    cardModel.querySelector('.popup__photos').src = renderImages();
    cardModel.querySelector('.popup__avatar').src = serverData.response[0].author.avatar;
    document.querySelector('.popup__close').addEventListener('click', function () {
      window.selectors.mapPins.removeChild(document.querySelector('.popup'));
    });
  };

  window.keksobooking.card = {
    renderCard: renderCard,
    fillInCardData: fillInCardData
  };
})();
