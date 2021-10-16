export class DateUtils{
  public static checkIfBefore(date, targetDate){
    return (new Date(date).getDate()<new Date(targetDate).getDate()
        && new Date(date).getMonth()==new Date(targetDate).getMonth()
        && new Date(date).getFullYear()==new Date(targetDate).getFullYear())
      ||( new Date(date).getMonth()<new Date(targetDate).getMonth()
        && new Date(date).getFullYear()==new Date(targetDate).getFullYear())
      || (new Date(date).getFullYear()<new Date(targetDate).getFullYear());
  }
  public static checkIfAfter(date, targetDate){
    return (new Date(date).getDate()>new Date(targetDate).getDate()
        && new Date(date).getMonth()==new Date(targetDate).getMonth()
        && new Date(date).getFullYear()==new Date(targetDate).getFullYear())
      ||( new Date(date).getMonth()>new Date(targetDate).getMonth()
        && new Date(date).getFullYear()==new Date(targetDate).getFullYear())
      || (new Date(date).getFullYear()>new Date(targetDate).getFullYear());
  }

}
