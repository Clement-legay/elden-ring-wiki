const sqlQuery = require('../sqlQuerry')

app.post('/api/full_set/findAll', async (req, res) => {
  let armors = await sqlQuery.sqlQuery('SELECT * FROM armors');

  armors = armors.filter(armor => !armor.name.includes('('));

  for (let i = 0; i < armors.length; i++) {
    if (armors[i].full_set === null) {
      let nameSplited = armors[i].name.split(' ');
      delete nameSplited[nameSplited.length - 1];

      let list = armors.filter(armor => armor.name.includes(nameSplited.join(' ')));
      let full_set = {
        helm: list.filter(armor => armor.category === 'Helm')[0],
        chest: list.filter(armor => armor.category === 'Chest Armor')[0],
        gauntlet: list.filter(armor => armor.category === 'Gauntlets')[0],
        leg_armor: list.filter(armor => armor.category === 'Leg Armor')[0]
      };
      console.log('décollage')
      const result = await sqlQuery.sqlQuery("INSERT INTO `full_set` (`helm`, `chest`, `gauntlet`, `leg_armor`) VALUES (?, ?, ?, ?)", [full_set.helm ? full_set.helm.id : null, full_set.chest ? full_set.chest.id : null, full_set.gauntlet ? full_set.gauntlet.id : null, full_set.leg_armor ? full_set.leg_armor.id : null]);
      let resultId = result.insertId;

      let helm = full_set.helm !== undefined ? await sqlQuery.sqlQuery("UPDATE `armors` SET `full_set` = ? WHERE `id` = ?", [resultId, full_set.helm.id]) : null
      let chest = full_set.chest !== undefined ? await sqlQuery.sqlQuery("UPDATE `armors` SET `full_set` = ? WHERE `id` = ?", [resultId, full_set.chest.id]) : null
      let gauntlet = full_set.gauntlet !== undefined ? await sqlQuery.sqlQuery("UPDATE `armors` SET `full_set` = ? WHERE `id` = ?", [resultId, full_set.gauntlet.id]) : null
      let leg_armor = full_set.leg_armor !== undefined ? await sqlQuery.sqlQuery("UPDATE `armors` SET `full_set` = ? WHERE `id` = ?", [resultId, full_set.leg_armor.id]) : null
    }
  }
})