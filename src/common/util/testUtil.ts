import { Board } from 'src/board/board.entity';
import { User } from 'src/user/user.entity';
export default class TestUtil {
  static giveMeAvalidUser(): User {
    const user = new User();
    user.id = 1;
    user.email = 'valid@email.com';
    user.name = 'Valid User';
    user.createdAt = new Date('2024-01-01T00:00:00.000Z');
    user.createdBy = 1;
    user.lastLoginAt = new Date('2024-01-01T11:43:54.000Z');
    user.password = '123456';
    return user;
  }

  static giveMeAvalidBoard(): Board {
    const board = new Board();
    board.id = 1;
    board.name = 'Sample Board';
    board.createdAt = new Date('2024-01-02T00:00:00.000Z');
    board.createdBy = 1;
    board.updatedAt = new Date('2024-01-02T00:00:00.000Z');
    board.updatedBy = 1;
    board.userId = 1;
    board.user = this.giveMeAvalidUser();
    return board;
  }
}
