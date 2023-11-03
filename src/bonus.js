/* eslint-disable class-methods-use-this */
import { Console, MissionUtils } from '@woowacourse/mission-utils';
// 일단 보너스랑 정답 입력은 App으로 하고 나중에 클래스 분리하자.
class Bonus {
  #bonus;

  constructor() {
    this.#bonus = getBonusNum();
  }

  // 보너스 넘버
  async getBonusNum() {
    const bonusNum =
      await MissionUtils.Console.readLineAsync(
        '보너스 번호를 입력해 주세요.\n',
      );
    const NumTypeBonus = Number(bonusNum);
    if (Number.isNaN(NumTypeBonus)) {
      throw new Error(`보너스 입력값은 숫자여야 합니다.`);
    }
    return NumTypeBonus;
  }

  duplCheckOfBonus(winningNum, bonusNum) {
    if (winningNum.includes(Number(bonusNum))) {
      throw new Error(`[ERRPR] 보너스 숫자는 중복될 수 없습니다.`);
    }
  }

  // 정답 숫자 입력 범위 확인, 정답, 보너스 둘 다 사용 가능
  validateNumRange(inputNum) {
    const MIN_NUM = 1;
    const MAX_NUM = 45;
    inputNum.forEach((number) => {
      if (number < MIN_NUM || MAX_NUM < number) {
        throw new Error(`[ERROR] 숫자 범위는 1~45 사이입니다.`);
      }
    });
  }
}

export default Bonus;