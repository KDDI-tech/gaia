'use strict';

function MockContactAllFieldsCJK(withoutPhoto) {
  var photo;
  if (!withoutPhoto) {
    photo = getPhotoBlob();
  }
  return {
    'id': '1',
    'updated': new Date(),
    'additionalName': [''],
    'adr': [
      {
        'type': ['自宅'],
        'pref': true,
        'countryName': '日本',
        'locality': '東京',
        'region': '東京',
        'postalCode': '1310045',
        'streetAddress': '墨田区押上1-1-2'
      }
    ],
    'bday': new Date(0),
    'email': [
      {
        'type': ['個人'],
        'value': 'test@test.com'
      },
      {
        'type': ['仕事'],
        'value': 'test@work.com',
        'pref': true
      }
    ],
    'honorificPrefix': ['Mr.'],
    'familyName': ['山田'],
    'givenName': ['太郎'],
    // KTEC ADD START
    'phoneticFamilyName': ['やまだ'],
    'phoneticGivenName': ['たろう'],
    // KTEC ADD END
    'nickname': ['やま'],
    'jobTitle': ['プログラマー'],
    'name': ['太郎 山田'],
    'org': ['Test ORG'],
    'tel': [
      {
        'value': '+346578888888',
        'type': ['携帯電話'],
        'carrier': 'KDDI',
        'pref': true
      },
      {
        'value': '+3120777777',
        'type': ['自宅'],
        'carrier': 'MOZ'
      }
    ],
    'url' : [
      {
        'type' : ['fb_profile_photo'],
        'value' : 'https://abcd1.jpg'
      }
    ],
    'category': ['favorite'],
    'note': ['Note 1'],
    'photo': [photo]
  };
}

function getPhotoBlob() {
  var b64 = 'R0lGODlhEAAQAMQfAKxoR8VkLxFw1feVPITSWv+eQv7Qo0Cc6OyIN/v7+3PLTSCZ' +
    'EFy17Wa6XuT1x2bGQ3nNUU6vRXPAa9mLXMTkwJZEHJt7LL5aJ/z8/O2KONx3L/ubP/r6+rtV' +
    'I////////yH5BAEAAB8ALAAAAAAQABAAAAWD4CeOZDlimOitnvlhXefFiyCs3NkZMe9QDMGi' +
    'k3t1BgZDIcZgHCCxHAyxKRQmnYOkoYgaNYMNr3JoEB6dDBGmyWxihwNBgVZz2Js3YB+JWNpr' +
    'HW15YgA2FxkaRB8JgoQxHQEbdiKNg4R5iYuVgpcZmkUjHDEapYqbJRyjkKouoqqhIyEAOw==';

  return b64toBlob(b64, 'image/gif');
}

function b64toBlob(b64Data, contentType, sliceSize) {
  contentType = contentType || '';
  sliceSize = sliceSize || 1024;

  function charCodeFromCharacter(c) {
    return c.charCodeAt(0);
  }

  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);
    var byteNumbers = Array.prototype.map.call(slice, charCodeFromCharacter);
    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, {type: contentType});
}
