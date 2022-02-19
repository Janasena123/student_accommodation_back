const db = require("../conn/database");

module.exports = {
  addBlock: (data, callBack) => {
    db.query(
      `insert into block(blockNo, blockName, genderType) values(?,?,?)`,
      [data.blockNo, data.blockName, data.genderType],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  addRoom: (data, callBack) => {
    db.query(
      `insert into room(roomNo, status, blockID) values(?,?,?)`,
      [data.roomNo, data.status, data.blockID],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getBlockByGender: (genderType, callBack) => {
    db.query(
      `select * from block where genderType = ?`,
      [genderType],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  updateRoom: (data, callBack) => {
    db.query(
      `update room set roomNo=?, status=? where roomID = ?`,
      [data.roomNo, data.status, data.roomId],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  updateBlock: (data, callBack) => {
    db.query(
      `update block set blockNo=?, blockName=?, genderType=? where blockID = ?`,
      [data.blockNo, data.blockName, data.roomId, data.blockID],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  deleteRoom: (data, callBack) => {
    db.query(
      `delete from room where roomID= ?`,
      [data.roomID],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  deleteBlock: (data, callBack) => {
    db.query(
      `delete from block where blockID= ?`,
      [data.roomID],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  checkAvalability: (data, callBack) => {
    db.query(
      `SELECT room.*,block.* FROM room inner join block on block.blockID=room.blockID WHERE room.roomID NOT IN (SELECT r.roomid FROM roombooking b INNER JOIN room r ON b.roomID = r.roomID WHERE (b.startDate<=? AND b.endDate>?) OR (b.startDate<? AND b.endDate>=?)) AND room.blockID=?`,
      [
        data.startDate,
        data.startDate,
        data.endDate,
        data.endDate,
        data.blockID,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
