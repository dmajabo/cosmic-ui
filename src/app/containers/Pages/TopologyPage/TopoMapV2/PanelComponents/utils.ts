export function convertSecondsToString(seconds: string): string {
  const HOURS = 3600;
  if (!seconds) {
    return `--`;
  }
  const inHours = parseInt(seconds) / HOURS;
  if (inHours > 24) {
    const inDays = inHours / 24;
    const remainingHours = inDays % 24;
    return `${inDays.toFixed(0)} days, ${remainingHours.toFixed(0)} hours`;
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
    return `${kbs} KB`;
  } else {
    const mbs = kbs / 1000;

    if (mbs >= 1000) {
      const gbs = mbs / 1000;
      return `${gbs} GB`;
    } else {
      return `${mbs} MB`;
    }
  }
}
