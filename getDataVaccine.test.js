/**
 * @jest-environment jsdom
 */

 const { test, expect } = require('@jest/globals');
 const script = require ('../src/script.js');
 
 const myData = [];
 const myInfo = [
     {Province: "Sao Paulo", Active: 4084833, Confirmed: 4229600, Deaths: 144767},
     {ID: "1948fe39-86b8-49b1-97d7-7650fd1d5e22", Country: "Brazil", CountryCode: "BR", Province: "Ceara", City: "",},
     {ID: "3a1100c2-c150-4dc3-bf7c-696911bc4c6f", Country: "Brazil", CountryCode: "BR", Province: "Distrito Federal", City: "",},
     {ID: "4036a5bf-49ac-4e18-beb0-1e487ab54c7b", Country: "Brazil", CountryCode: "BR", Province: "Rio Grande do Norte", City: "",},
     {ID: "462e2bc7-2045-4f3f-baa2-59da015d822a", Country: "Brazil", CountryCode: "BR", Province: "Tocantins", City: "",},
     {ID: "4fc9590b-b502-49a4-af26-841f887378e0", Country: "Brazil", CountryCode: "BR", Province: "Alagoas", City: "",},
     {ID: "562c9bdb-f786-4916-bf02-c7afb6926d9f", Country: "Brazil", CountryCode: "BR", Province: "Para", City: "",},
     {ID: "5f2df483-d4a0-47c7-8985-dea49057de89", Country: "Brazil", CountryCode: "BR", Province: "Acre", City: "",}
 ]
 
 const mockForEach = jest
 .spyOn(script, "wannaTestForEach")
 .mockImplementation(() => {
     myInfo.forEach(element => {
         myData[element.Province] = { state: element.Province, casos: element.Confirmed, mortes: element.Deaths, ativos: element.Active };
         mortesBR += element.Deaths;
         casosBR += element.Confirmed;
         ativosBR += element.Active;
       });
 script.wannaTestForEach();
 test('Testando se forEach retorna um objeto', () => {
 
 });
     expect(typeof myData).toBe('object');
 });
 
 test('Testando se o retorno de forEach tem uma length igual ao array passado como parametro', () => {
     const mockForEach = jest
     .spyOn(script, "wannaTestForEach")
     .mockImplementation(() => {
         myInfo.forEach(element => {
             myData[element.Province] = { state: element.Province, casos: element.Confirmed, mortes: element.Deaths, ativos: element.Active };
             mortesBR += element.Deaths;
             casosBR += element.Confirmed;
             ativosBR += element.Active;
           });
     script.wannaTestForEach();
 });
     expect(myData.length).toBe(8);
 });
 
 test('Testando se forEach tem um objeto no index 0 igual ao do array mockado', () => {
     const mockForEach = jest
     .spyOn(script, "wannaTestForEach")
     .mockImplementation(() => {
         myInfo.forEach(element => {
             myData[element.Province] = { state: element.Province, casos: element.Confirmed, mortes: element.Deaths, ativos: element.Active };
             mortesBR += element.Deaths;
             casosBR += element.Confirmed;
             ativosBR += element.Active;
           });
     script.wannaTestForEach();
 });
     expect(myData['Sao Paulo']).toBe({ state: "Sao Paulo", casos: 4229600, mortes: 144767, ativos: 4084833 });
 });