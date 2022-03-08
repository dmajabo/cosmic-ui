export function convertSecondsToString(seconds: string): string {
  const HOURS = 3600;
  if (!seconds) {
    return `--`;
  }
  const inHours = parseInt(seconds) / HOURS;
  if (inHours > 24) {
    const inDays = inHours / 24;
    const remainingHours = inDays % 24;
    const daysString = parseInt(inDays.toFixed(0)) <= 1 ? 'day' : 'days';
    const hoursString = parseInt(remainingHours.toFixed(0)) <= 1 ? 'hour' : 'hours';
    return `${inDays.toFixed(0)} ${daysString}, ${remainingHours.toFixed(0)} ${hoursString}`;
  } else {
    if (inHours < 1) {
      const minutes = (inHours * 60).toFixed(0);
      return parseInt(minutes) <= 1 ? `${minutes} minute` : `${minutes} minutes`;
    }
    const inHoursInNum = parseInt(inHours.toFixed(0));
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
