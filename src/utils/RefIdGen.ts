export class ReferenceIdGenerator {
  private static generateRandomAlphaNumeric(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  }

  private static getCurrentJulianDate(): string {
    const now = new Date();
    const year = now.getFullYear().toString().slice(-1);
    const dayOfYear = Math.floor(
      (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000,
    );
    return year + dayOfYear.toString().padStart(3, '0');
  }

  private static getCurrentTime(): string {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return hours + minutes;
  }

  public static generate(): string {
    const randomAlphaNumeric = this.generateRandomAlphaNumeric(27);
    const julianDate = this.getCurrentJulianDate();
    const currentTime = this.getCurrentTime();
    // Return the first 35 characters, if the lenght is greather than 35
    const referenceId = randomAlphaNumeric + julianDate + currentTime;
    return referenceId.slice(0, 35);
  }
}