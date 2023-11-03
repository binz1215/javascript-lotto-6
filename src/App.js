/* eslint-disable class-methods-use-this */
import { Console, MissionUtils } from '@woowacourse/mission-utils';

class App {
  async play() {
    this.#makeLottoNum();
    // await this.allOfInputfunc();
    await this.#allOfMoneyfunc();
  }

  // 당첨번호 & 보너스번호 입력 함수 총집합
  static async allOfInputfunc() {
    const winningNum = await this.stringToNum();
    this.validateWinningNumLength(winningNum);
    const bonusNum = await this.getBonusNum();
    this.duplCheckOfWinngNum(winningNum);
    this.duplCheckOfBonus(winningNum, bonusNum);
    this.validateNumRange(winningNum);
    this.validateNumRange([bonusNum]); // 배열 형태로 전달
  }

  #makeLottoNum() {
    const NEED_NUM = 6;
    const myLottoNum = [];
    while (myLottoNum.length < NEED_NUM) {
      const pick = MissionUtils.Random.pickNumberInRange(1, 45);
      if (!myLottoNum.includes(pick)) {
        myLottoNum.push(pick); // 일단 이 배열은 정렬 안되어 있음. 하지만 숫자상태
      }
    }
    MissionUtils.Console.print(myLottoNum.sort((a, b) => a - b)); // 정렬되었지만 문자열상태 다른함수로 뺄거임.

    return myLottoNum;
  }

  static async getWinningNum() {
    const getNum =
      await MissionUtils.Console.readLineAsync('당첨 번호를 입력해 주세요.\n');
    const winningNum = String(getNum).split(','); // 문자열 형태

    return winningNum; // 문자열 상태
  }

  // 입력 값이 숫자인지 유효성도 같이 확인하면서 문자열을 숫자로 변환.
  static async stringToNum() {
    const getWinningNum = await this.getWinningNum();
    const numTypeOfWin = getWinningNum.map(Number);
    if (numTypeOfWin.includes(NaN)) {
      throw new Error(`[ERROR] 입력 값은 숫자여야 합니다.`);
    }
    Console.print(numTypeOfWin); // 지워야 함
    return numTypeOfWin;
  }

  // 보너스 넘버
  static async getBonusNum() {
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

  static duplCheckOfBonus(winningNum, bonusNum) {
    if (winningNum.includes(Number(bonusNum))) {
      throw new Error(`[ERRPR] 보너스 숫자는 중복될 수 없습니다.`);
    }
  }

  // 정답 숫자 길이 유효성 확인
  static validateWinningNumLength(winningNum) {
    const WINNINGNUM_LENGTH = 6;
    if (winningNum.length !== WINNINGNUM_LENGTH) {
      throw new Error(`[ERROR] 숫자 6개를 입력해야 합니다.`);
    }
  }

  // 정답 숫자 입력 범위 확인, 정답, 보너스 둘 다 사용 가능
  static validateNumRange(inputNum) {
    const MIN_NUM = 1;
    const MAX_NUM = 45;
    inputNum.forEach((number) => {
      if (number < MIN_NUM || MAX_NUM < number) {
        throw new Error(`[ERROR] 숫자 범위는 1~45 사이입니다.`);
      }
    });
  }

  // 정답 숫자 중복 확인.
  static duplCheckOfWinngNum(winningNum) {
    const setWinningNum = new Set(winningNum);
    if (winningNum.length !== setWinningNum.size) {
      throw new Error(`[ERROR] 당첨 번호는 중복될 수 없습니다.`);
    }
  }

  // ------로또구입 함수------
  async #allOfMoneyfunc() {
    const inputMoney = await this.getMoney();
    this.#validateMoneyIsNum(inputMoney);
    this.#validateMoneyUnit(inputMoney);
    this.#claculateNumOfBuy(inputMoney);
  }

  // 로또 구입 금액 입력받기
  async getMoney() {
    const inputMoney =
      await MissionUtils.Console.readLineAsync('구입금액을 입력해 주세요.\n');

    return Number(inputMoney);
  }

  // 구입금액 유효성 확인
  #validateMoneyIsNum(inputMoney) {
    if (Number.isNaN(inputMoney)) {
      throw new Error(`[ERROR] 구입금액은 숫자만 입력 가능합니다.`);
    }
  }

  #validateMoneyUnit(inputMoney) {
    const MONEY_UNIT = 1000;
    if (inputMoney % MONEY_UNIT !== 0) {
      throw new Error(`[ERROR] 구입금액은 천원 단위로 입력 가능합니다.`);
    }
  }

  // 로또 구입 갯수 계산
  #claculateNumOfBuy(inputMoney) {
    const MONEY_UNIT = 1000;
    const numOfBuy = inputMoney / MONEY_UNIT;
    Console.print(numOfBuy); // 테스트용 지워야함.
    return numOfBuy;
  }

  // --------------------------------당첨금 계산 함수-------
}

export default App;

const app = new App();
app.play();
