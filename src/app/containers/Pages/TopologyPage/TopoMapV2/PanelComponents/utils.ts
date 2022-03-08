export function convertSecondsToString(seconds: string): string {
  const HOURS = 3600;
  if (!seconds) {
    return `--`;
  }
  const inHours = parseInt(seconds) / HOURS;
  if (inHours > 24) {
    const inDays = inHours / 24;
    const remainingHours = inDays % 24;
    const daysString = inDays <= 1 ? 'day' : 'days';
    const hoursString = remainingHours > 1 ? 'hours' : 'hour';
    return `${inDays.toFixed(0)} ${daysString}, ${remainingHours.toFixed(1)} ${hoursString}`;
  } else {
    if (inHours < 1) {
      const minutes = (inHours * 60).toFixed(1);
      if (parseInt(minutes) < 1) {
        return `${parseInt(minutes) * 60} seconds`;
      }
      return parseInt(minutes) <= 1 ? `${parseInt(minutes)} minute` : `${parseInt(minutes)} minutes`;
    }
    const inHoursInNum = parseInt(inHours.toFixed(1));
    return inHoursInNum <= 1 ? `${inHoursInNum} hour` : `${inHoursInNum} hours`;
  }
}

export function convertBytesToHumanReadableString(bytes: string): string {
  const bytesInNum = parseInt(bytes);
  if (!bytes) {
    return '-';
  }

  const kbs = bytesInNum / 1000;

  if (kbs < 1000) {
    return `${kbs.toFixed(2)} KB`;
  } else {
    const mbs = kbs / 1000;

    if (mbs >= 1000) {
      const gbs = mbs / 1000;
      return `${gbs.toFixed(2)} GB`;
    } else {
      return `${mbs.toFixed(2)} MB`;
    }
  }
}
