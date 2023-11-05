import { Console, MissionUtils } from '@woowacourse/mission-utils';

class Input {
  async getWinningNum() {
    // Console.print('\n');
    const getNum = await MissionUtils.Console.readLineAsync('당첨 번호를 입력해 주세요.\n');
    const winningNum = String(getNum).split(','); // 문자열 형태

    return winningNum; // 문자열 상태
  }

  async getBonusNum() {
    const bonusNum = await MissionUtils.Console.readLineAsync('보너스 번호를 입력해 주세요.\n');

    return bonusNum;
  }
}

export default Input;
