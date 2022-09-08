import * as SQLite from 'expo-sqlite';

const database = SQLite.openDatabase('places.db');

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
            `CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY NOT NULL,
            title TEXT NOT NULL,r
            imageUri TEXT NOT NULL,
        )`,
                [],
                () => {
                     resolve()
                },
                (_, error) => {
                    reject(error)
              }
            );
        });
    });

    return promise;
}

export function insertPlace(place) {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `INSERT INTO places (title, imageUri) VALUES (?, ?, ?)`,
                [place.title, place.imageUri],
                (_,result) => {
                    console.log(result);
                    resolve(result);
                },
                (_, error) => {
                    reject(error);
                }
            )
        })
    })

    return promise
}