function separateArr(arr, max) {
  var result = [[]];
  var group = 0;

  for (var index = 0; index < arr.length; index++) {
    if (result[group] === undefined) {
      result[group] = [];
    }

    result[group].push(arr[index]);

    if ((index + 1) % max === 0) {
      group = group + 1;
    }
  }

  return result;
}

function getIconSize(width, multiplier = 1, variation = 4) {
  let iconSize = 0;
  let defaultSize = 22;

  if (width < 360) {
    iconSize = defaultSize * multiplier;
    return iconSize;
  }
  if (width < 768) {
    iconSize = defaultSize * multiplier;
    iconSize = iconSize + variation;
    return iconSize;
  }
  if (width < 1360) {
    iconSize = defaultSize * multiplier;
    iconSize = iconSize + variation * 2;
    return iconSize;
  }
  if (width < 1600) {
    iconSize = defaultSize * multiplier;
    iconSize = iconSize + variation * 3;
    return iconSize;
  }
  if (width > 1600) {
    iconSize = defaultSize * multiplier;
    iconSize = iconSize + variation * 4;
    return iconSize;
  }
}

const codes = {
  OK: 200,
  CREATED: 201,
  ACCPETED: 202,
  REDIRECT: 302,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
};

module.exports = { separateArr, getIconSize, codes };
