// Generates a realistic player roster for the 19 supported countries.
// Outputs both a TS data file (local fallback) and SQL for Supabase seeding.
import { writeFileSync } from "node:fs";

const COUNTRIES = [
  ["Argentina", "ar", "CONMEBOL"],
  ["Belgium", "be", "UEFA"],
  ["Brazil", "br", "CONMEBOL"],
  ["Cameroon", "cm", "CAF"],
  ["Croatia", "hr", "UEFA"],
  ["Ecuador", "ec", "CONMEBOL"],
  ["Egypt", "eg", "CAF"],
  ["England", "gb-eng", "UEFA"],
  ["France", "fr", "UEFA"],
  ["Italy", "it", "UEFA"],
  ["Netherlands", "nl", "UEFA"],
  ["Norway", "no", "UEFA"],
  ["Poland", "pl", "UEFA"],
  ["Portugal", "pt", "UEFA"],
  ["Senegal", "sn", "CAF"],
  ["South Korea", "kr", "AFC"],
  ["Spain", "es", "UEFA"],
  ["Sweden", "se", "UEFA"],
  ["Uruguay", "uy", "CONMEBOL"],
];

// [name, club, position, age, rating, jersey, foot, goals, assists]
const ROSTER = {
  Argentina: [
    ["Lionel Messi", "Inter Miami", "Forward", 37, 93, 10, "Left", 28, 18],
    ["Emiliano Martinez", "Aston Villa", "Goalkeeper", 32, 88, 23, "Right", 0, 0],
    ["Cristian Romero", "Tottenham", "Defender", 26, 86, 13, "Right", 3, 1],
    ["Nicolas Otamendi", "Benfica", "Defender", 36, 83, 2, "Right", 4, 0],
    ["Enzo Fernandez", "Chelsea", "Midfielder", 23, 84, 24, "Right", 5, 7],
    ["Alexis Mac Allister", "Liverpool", "Midfielder", 25, 85, 20, "Right", 6, 8],
    ["Julian Alvarez", "Atletico Madrid", "Forward", 24, 86, 9, "Right", 16, 6],
    ["Lautaro Martinez", "Inter Milan", "Forward", 27, 87, 22, "Right", 24, 5],
    ["Nahuel Molina", "Atletico Madrid", "Defender", 26, 82, 26, "Right", 1, 3],
    ["Giovani Lo Celso", "Real Betis", "Midfielder", 28, 82, 18, "Right", 4, 6],
    ["Nicolas Gonzalez", "Fiorentina", "Forward", 26, 81, 11, "Right", 12, 4],
    ["Emiliano Buendia", "Aston Villa", "Midfielder", 27, 79, 8, "Right", 3, 5],
    ["Geronimo Rulli", "Ajax", "Goalkeeper", 32, 80, 12, "Right", 0, 0],
    ["Marcos Acuna", "Sevilla", "Defender", 33, 80, 8, "Left", 1, 4],
    ["Exequiel Palacios", "Leverkusen", "Midfielder", 26, 81, 14, "Right", 3, 4],
  ],
  Belgium: [
    ["Kevin De Bruyne", "Manchester City", "Midfielder", 33, 91, 17, "Right", 12, 18],
    ["Romelu Lukaku", "Napoli", "Forward", 31, 85, 9, "Left", 19, 5],
    ["Thibaut Courtois", "Real Madrid", "Goalkeeper", 32, 90, 1, "Left", 0, 0],
    ["Jeremy Doku", "Manchester City", "Forward", 22, 83, 11, "Right", 6, 7],
    ["Youri Tielemans", "Aston Villa", "Midfielder", 27, 83, 8, "Right", 5, 6],
    ["Axel Witsel", "Atletico Madrid", "Defender", 35, 82, 6, "Right", 2, 2],
    ["Yannick Carrasco", "Al-Shabab", "Midfielder", 30, 82, 11, "Right", 7, 5],
    ["Jan Vertonghen", "Anderlecht", "Defender", 37, 80, 5, "Left", 3, 1],
    ["Amadou Onana", "Aston Villa", "Midfielder", 23, 82, 18, "Right", 2, 3],
    ["Leandro Trossard", "Arsenal", "Forward", 29, 82, 23, "Left", 9, 6],
    ["Charles De Ketelaere", "Atalanta", "Forward", 23, 81, 17, "Right", 10, 8],
    ["Wout Faes", "Leicester City", "Defender", 26, 79, 4, "Right", 2, 0],
    ["Koen Casteels", "Al-Qadsiah", "Goalkeeper", 32, 81, 12, "Right", 0, 0],
    ["Orel Mangala", "Lyon", "Midfielder", 26, 79, 16, "Right", 2, 3],
    ["Thomas Meunier", "Lille", "Defender", 33, 79, 15, "Right", 1, 3],
  ],
  Brazil: [
    ["Vinicius Junior", "Real Madrid", "Forward", 24, 90, 7, "Right", 21, 12],
    ["Rodrygo", "Real Madrid", "Forward", 23, 86, 11, "Right", 13, 7],
    ["Neymar Jr", "Al-Hilal", "Forward", 32, 87, 10, "Right", 14, 9],
    ["Alisson Becker", "Liverpool", "Goalkeeper", 32, 89, 1, "Right", 0, 0],
    ["Marquinhos", "Paris Saint-Germain", "Defender", 30, 86, 4, "Right", 4, 1],
    ["Casemiro", "Manchester United", "Midfielder", 32, 84, 5, "Right", 4, 3],
    ["Bruno Guimaraes", "Newcastle United", "Midfielder", 26, 85, 8, "Right", 6, 7],
    ["Eder Militao", "Real Madrid", "Defender", 26, 85, 3, "Right", 2, 1],
    ["Gabriel Martinelli", "Arsenal", "Forward", 23, 83, 11, "Right", 11, 5],
    ["Richarlison", "Tottenham", "Forward", 27, 82, 9, "Right", 10, 3],
    ["Lucas Paqueta", "West Ham United", "Midfielder", 27, 83, 7, "Right", 5, 6],
    ["Gabriel Magalhaes", "Arsenal", "Defender", 26, 83, 6, "Left", 4, 1],
    ["Ederson", "Manchester City", "Goalkeeper", 31, 86, 2, "Right", 0, 0],
    ["Antony", "Real Betis", "Forward", 24, 80, 19, "Left", 4, 3],
    ["Wendell Lira", "Botafogo", "Defender", 27, 78, 16, "Right", 2, 2],
  ],
  Cameroon: [
    ["Andre Onana", "Manchester United", "Goalkeeper", 28, 84, 24, "Right", 0, 0],
    ["Vincent Aboubakar", "Besiktas", "Forward", 32, 80, 10, "Right", 14, 4],
    ["Karl Toko Ekambi", "Al-Hilal", "Forward", 32, 79, 15, "Right", 11, 3],
    ["Bryan Mbeumo", "Brentford", "Forward", 25, 82, 19, "Right", 12, 6],
    ["Andre-Frank Zambo Anguissa", "Napoli", "Midfielder", 28, 83, 6, "Right", 3, 4],
    ["Jean-Charles Castelletto", "Nantes", "Defender", 29, 78, 4, "Right", 2, 0],
    ["Pierre Kunde", "Atletico Madrid", "Midfielder", 29, 78, 8, "Right", 2, 2],
    ["Georges-Kevin Nkoudou", "Damac", "Midfielder", 29, 76, 11, "Right", 4, 3],
    ["Collins Fai", "Al-Tai", "Defender", 32, 75, 2, "Right", 1, 2],
    ["Nouhou Tolo", "Seattle Sounders", "Defender", 27, 76, 3, "Left", 0, 1],
    ["Samuel Eto'o Jr", "Antalyaspor", "Forward", 28, 77, 9, "Right", 8, 2],
    ["Eric Maxim Choupo-Moting", "Inter Miami", "Forward", 35, 78, 13, "Right", 6, 2],
    ["Carlos Kameni", "Aris", "Goalkeeper", 30, 75, 16, "Right", 0, 0],
    ["Olivier Kemen", "Sivasspor", "Midfielder", 28, 75, 14, "Right", 2, 2],
    ["Jerome Ngom Mbekeli", "Coton Sport", "Defender", 26, 72, 5, "Right", 1, 1],
  ],
  Croatia: [
    ["Luka Modric", "Real Madrid", "Midfielder", 39, 87, 10, "Right", 8, 9],
    ["Mateo Kovacic", "Manchester City", "Midfielder", 30, 84, 8, "Right", 5, 6],
    ["Marcelo Brozovic", "Al-Nassr", "Midfielder", 31, 83, 11, "Right", 4, 4],
    ["Ivan Perisic", "PSV", "Forward", 35, 81, 4, "Right", 7, 5],
    ["Andrej Kramaric", "Hoffenheim", "Forward", 33, 82, 9, "Right", 13, 6],
    ["Dominik Livakovic", "Fenerbahce", "Goalkeeper", 29, 83, 1, "Right", 0, 0],
    ["Joško Gvardiol", "Manchester City", "Defender", 22, 85, 20, "Left", 3, 2],
    ["Borna Sosa", "Sevilla", "Defender", 26, 79, 3, "Left", 2, 4],
    ["Mario Pasalic", "Atalanta", "Midfielder", 29, 80, 15, "Right", 6, 4],
    ["Lovro Majer", "Wolfsburg", "Midfielder", 27, 80, 7, "Right", 4, 5],
    ["Ante Budimir", "Osasuna", "Forward", 33, 78, 17, "Right", 9, 2],
    ["Bruno Petkovic", "Dinamo Zagreb", "Forward", 30, 77, 16, "Right", 8, 3],
    ["Josip Stanisic", "Leverkusen", "Defender", 24, 79, 2, "Right", 1, 1],
    ["Josip Brekalo", "Fiorentina", "Midfielder", 26, 77, 21, "Right", 3, 3],
    ["Ivo Grbic", "Sheffield United", "Goalkeeper", 28, 76, 12, "Right", 0, 0],
  ],
  Ecuador: [
    ["Moises Caicedo", "Chelsea", "Midfielder", 22, 83, 23, "Right", 2, 4],
    ["Enner Valencia", "Inter Brasilia", "Forward", 35, 78, 13, "Right", 11, 3],
    ["Piero Hincapie", "Leverkusen", "Defender", 22, 81, 3, "Left", 2, 1],
    ["Kendry Paez", "Independiente del Valle", "Midfielder", 17, 79, 20, "Right", 5, 4],
    ["Gonzalo Plata", "Al-Sadd", "Forward", 23, 78, 19, "Right", 6, 4],
    ["Pervis Estupinan", "Brighton", "Defender", 26, 80, 7, "Left", 1, 3],
    ["Angel Mena", "León", "Midfielder", 36, 75, 21, "Right", 4, 3],
    ["Esteban Dreer", "Emelec", "Goalkeeper", 37, 73, 1, "Right", 0, 0],
    ["Felix Torres", "Santos", "Defender", 27, 77, 2, "Right", 1, 0],
    ["Jeremy Sarmiento", "Burnley", "Forward", 22, 76, 17, "Right", 3, 2],
    ["Carlos Gruezo", "San Jose Earthquakes", "Midfielder", 29, 75, 8, "Right", 1, 2],
    ["Jackson Porozo", "Sassuolo", "Defender", 25, 75, 4, "Right", 1, 0],
    ["Leonardo Campana", "Wolves", "Forward", 24, 76, 9, "Right", 5, 2],
    ["Alan Minda", "Cercle Brugge", "Forward", 23, 74, 11, "Right", 4, 2],
    ["Hernan Galindez", "Universidad de Chile", "Goalkeeper", 37, 73, 12, "Right", 0, 0],
  ],
  Egypt: [
    ["Mohamed Salah", "Liverpool", "Forward", 32, 90, 11, "Left", 23, 13],
    ["Mohamed Elneny", "Arsenal", "Midfielder", 32, 77, 17, "Right", 1, 2],
    ["Trezeguet", "Trabzonspor", "Forward", 29, 79, 7, "Right", 9, 5],
    ["Ahmed Hegazy", "Al-Ittihad", "Defender", 33, 78, 6, "Right", 2, 0],
    ["Omar Marmoush", "Eintracht Frankfurt", "Forward", 25, 83, 9, "Right", 16, 6],
    ["Mostafa Mohamed", "Nantes", "Forward", 27, 78, 13, "Right", 8, 3],
    ["Marwan Attia", "Al Ahly", "Midfielder", 23, 76, 8, "Right", 3, 3],
    ["Ahmed Fattouh", "Zamalek", "Defender", 27, 74, 3, "Left", 1, 2],
    ["Mohamed Abou Gabal", "National Bank", "Goalkeeper", 38, 75, 1, "Right", 0, 0],
    ["Emam Ashour", "Al Ahly", "Midfielder", 26, 77, 10, "Right", 6, 4],
    ["Zizo", "Zamalek", "Midfielder", 28, 77, 11, "Right", 7, 5],
    ["Mohamed Hany", "Al Ahly", "Defender", 29, 74, 2, "Right", 1, 2],
    ["Hussein Faisal", "Pyramids", "Forward", 28, 74, 14, "Right", 5, 2],
    ["Hamdy Fathy", "Al Ahly", "Midfielder", 29, 75, 5, "Right", 2, 2],
    ["Mohamed Sobhi", "Future", "Goalkeeper", 26, 73, 22, "Right", 0, 0],
  ],
  England: [
    ["Harry Kane", "Bayern Munich", "Forward", 31, 90, 9, "Right", 36, 8],
    ["Jude Bellingham", "Real Madrid", "Midfielder", 21, 89, 10, "Right", 18, 9],
    ["Bukayo Saka", "Arsenal", "Forward", 23, 87, 7, "Left", 16, 9],
    ["Phil Foden", "Manchester City", "Midfielder", 24, 88, 47, "Right", 19, 8],
    ["Declan Rice", "Arsenal", "Midfielder", 25, 86, 41, "Right", 4, 7],
    ["Jordan Pickford", "Everton", "Goalkeeper", 30, 83, 1, "Right", 0, 0],
    ["John Stones", "Manchester City", "Defender", 30, 84, 5, "Right", 2, 1],
    ["Kyle Walker", "Manchester City", "Defender", 34, 83, 2, "Right", 1, 2],
    ["Marcus Rashford", "Manchester United", "Forward", 27, 84, 10, "Right", 12, 5],
    ["Jack Grealish", "Manchester City", "Forward", 29, 84, 7, "Right", 5, 7],
    ["Trent Alexander-Arnold", "Real Madrid", "Defender", 25, 86, 66, "Right", 3, 8],
    ["Cole Palmer", "Chelsea", "Midfielder", 22, 86, 20, "Right", 22, 11],
    ["Reece James", "Chelsea", "Defender", 24, 83, 24, "Right", 2, 3],
    ["Ollie Watkins", "Aston Villa", "Forward", 28, 83, 11, "Right", 19, 6],
    ["Jordan Henderson", "Ajax", "Midfielder", 34, 80, 8, "Right", 2, 4],
    ["Conor Gallagher", "Atletico Madrid", "Midfielder", 24, 82, 4, "Right", 5, 4],
    ["Marc Guehi", "Crystal Palace", "Defender", 24, 82, 6, "Right", 1, 0],
    ["Ivan Toney", "Al-Ahli", "Forward", 28, 82, 17, "Right", 12, 3],
  ],
  France: [
    ["Kylian Mbappe", "Real Madrid", "Forward", 25, 91, 9, "Right", 30, 7],
    ["Antoine Griezmann", "Atletico Madrid", "Forward", 33, 87, 7, "Left", 16, 8],
    ["Aurelien Tchouameni", "Real Madrid", "Midfielder", 24, 85, 14, "Right", 3, 3],
    ["Eduardo Camavinga", "Real Madrid", "Midfielder", 22, 84, 6, "Left", 2, 4],
    ["Theo Hernandez", "AC Milan", "Defender", 27, 84, 22, "Left", 5, 5],
    ["William Saliba", "Arsenal", "Defender", 23, 85, 2, "Right", 2, 0],
    ["Ousmane Dembele", "Paris Saint-Germain", "Forward", 27, 85, 10, "Right", 8, 8],
    ["Mike Maignan", "AC Milan", "Goalkeeper", 29, 86, 16, "Right", 0, 0],
    ["Dayot Upamecano", "Bayern Munich", "Defender", 26, 83, 4, "Right", 2, 1],
    ["Adrien Rabiot", "Marseille", "Midfielder", 29, 82, 14, "Right", 5, 4],
    ["Marcus Thuram", "Inter Milan", "Forward", 27, 83, 9, "Right", 13, 5],
    ["Jules Kounde", "Barcelona", "Defender", 25, 84, 23, "Right", 3, 2],
    ["Bradley Barcola", "Paris Saint-Germain", "Forward", 22, 82, 29, "Right", 10, 6],
    ["Warren Zaire-Emery", "Paris Saint-Germain", "Midfielder", 18, 81, 17, "Right", 4, 3],
    ["Ibrahima Konate", "Liverpool", "Defender", 25, 83, 5, "Right", 1, 0],
    ["Randal Kolo Muani", "Paris Saint-Germain", "Forward", 25, 81, 12, "Right", 7, 3],
    ["Hugo Lloris", "Los Angeles FC", "Goalkeeper", 37, 80, 1, "Right", 0, 0],
    ["N'Golo Kante", "Al-Ittihad", "Midfielder", 33, 82, 13, "Right", 3, 3],
  ],
  Italy: [
    ["Federico Chiesa", "Liverpool", "Forward", 27, 83, 14, "Right", 8, 4],
    ["Nicolo Barella", "Inter Milan", "Midfielder", 27, 86, 18, "Right", 6, 7],
    ["Gianluigi Donnarumma", "Paris Saint-Germain", "Goalkeeper", 25, 87, 21, "Right", 0, 0],
    ["Alessandro Bastoni", "Inter Milan", "Defender", 25, 85, 95, "Left", 3, 3],
    ["Sandro Tonali", "Newcastle United", "Midfielder", 24, 84, 8, "Right", 4, 5],
    ["Giacomo Raspadori", "Napoli", "Forward", 24, 80, 17, "Right", 9, 4],
    ["Davide Frattesi", "Inter Milan", "Midfielder", 25, 81, 16, "Right", 5, 3],
    ["Giovanni Di Lorenzo", "Napoli", "Defender", 31, 82, 22, "Right", 2, 4],
    ["Bryan Cristante", "Roma", "Midfielder", 29, 80, 4, "Right", 3, 2],
    ["Mateo Retegui", "Atalanta", "Forward", 25, 81, 19, "Right", 11, 3],
    ["Riccardo Calafiori", "Arsenal", "Defender", 22, 83, 5, "Right", 1, 1],
    ["Federico Dimarco", "Inter Milan", "Defender", 27, 83, 32, "Left", 4, 5],
    ["Wilfried Gnonto", "Leeds United", "Forward", 21, 78, 11, "Right", 6, 3],
    ["Samuele Ricci", "Torino", "Midfielder", 23, 79, 8, "Right", 2, 2],
    ["Alessandro Buongiorno", "Napoli", "Defender", 25, 81, 4, "Right", 1, 0],
    ["Alex Meret", "Napoli", "Goalkeeper", 27, 80, 1, "Right", 0, 0],
    ["Lorenzo Pellegrini", "Roma", "Midfielder", 28, 81, 7, "Right", 5, 4],
    ["Mattia Zaccagni", "Lazio", "Forward", 29, 80, 20, "Right", 7, 4],
  ],
  Netherlands: [
    ["Virgil van Dijk", "Liverpool", "Defender", 33, 88, 4, "Right", 4, 2],
    ["Frenkie de Jong", "Barcelona", "Midfielder", 27, 85, 21, "Right", 3, 5],
    ["Cody Gakpo", "Liverpool", "Forward", 25, 84, 18, "Right", 12, 6],
    ["Memphis Depay", "Atletico Madrid", "Forward", 30, 83, 11, "Right", 11, 5],
    ["Xavi Simons", "RB Leipzig", "Midfielder", 21, 84, 7, "Right", 8, 6],
    ["Denzel Dumfries", "Inter Milan", "Defender", 28, 82, 22, "Right", 3, 4],
    ["Tijjani Reijnders", "AC Milan", "Midfielder", 26, 82, 14, "Right", 4, 4],
    ["Nathan Ake", "Manchester City", "Defender", 29, 82, 6, "Left", 2, 1],
    ["Bart Verbruggen", "Brighton", "Goalkeeper", 22, 80, 1, "Right", 0, 0],
    ["Mats Wieffer", "Brighton", "Midfielder", 25, 79, 8, "Right", 2, 3],
    ["Donyell Malen", "Borussia Dortmund", "Forward", 25, 81, 21, "Right", 9, 4],
    ["Joey Veerman", "PSV", "Midfielder", 26, 79, 11, "Right", 5, 5],
    ["Stefan de Vrij", "Inter Milan", "Defender", 32, 80, 3, "Right", 1, 0],
    ["Wout Weghorst", "Ajax", "Forward", 32, 77, 9, "Right", 7, 2],
    ["Lutsharel Geertruida", "Feyenoord", "Defender", 24, 80, 4, "Right", 1, 2],
    ["Jerdy Schouten", "PSV", "Midfielder", 27, 80, 16, "Right", 2, 2],
    ["Quinten Timber", "Feyenoord", "Midfielder", 23, 79, 10, "Right", 4, 4],
    ["Mark Flekken", "Brentford", "Goalkeeper", 31, 79, 13, "Right", 0, 0],
  ],
  Norway: [
    ["Erling Haaland", "Manchester City", "Forward", 24, 91, 9, "Left", 27, 5],
    ["Martin Odegaard", "Arsenal", "Midfielder", 25, 86, 8, "Left", 11, 9],
    ["Alexander Sorloth", "Atletico Madrid", "Forward", 28, 82, 19, "Right", 14, 4],
    ["Sander Berge", "Fulham", "Midfielder", 26, 80, 15, "Right", 3, 3],
    ["David Moeller Wolfe", "Burnley", "Defender", 25, 76, 5, "Left", 2, 2],
    ["Kristoffer Ajer", "Brentford", "Defender", 26, 79, 4, "Right", 2, 1],
    ["Marcus Holmgren Pedersen", "Burnley", "Defender", 24, 76, 2, "Right", 1, 1],
    ["Leo Ostigard", "Rennes", "Defender", 25, 77, 3, "Right", 1, 0],
    ["Orjan Nyland", "Sevilla", "Goalkeeper", 34, 78, 1, "Right", 0, 0],
    ["Antonio Nusa", "RB Leipzig", "Forward", 19, 79, 11, "Right", 5, 4],
    ["Oscar Bobb", "Manchester City", "Forward", 21, 78, 52, "Right", 4, 3],
    ["Patrick Berg", "Bodo/Glimt", "Midfielder", 27, 76, 14, "Right", 3, 3],
    ["Hugo Vetlesen", "Club Brugge", "Midfielder", 24, 77, 10, "Right", 4, 3],
    ["Jorgen Strand Larsen", "Wolves", "Forward", 24, 78, 9, "Right", 8, 2],
    ["Julian Ryerson", "Borussia Dortmund", "Defender", 27, 78, 17, "Right", 1, 2],
    ["Egil Selvik", "Watford", "Goalkeeper", 27, 75, 12, "Right", 0, 0],
  ],
  Poland: [
    ["Robert Lewandowski", "Barcelona", "Forward", 36, 89, 9, "Right", 23, 6],
    ["Piotr Zielinski", "Inter Milan", "Midfielder", 30, 82, 20, "Right", 7, 6],
    ["Wojciech Szczesny", "Barcelona", "Goalkeeper", 34, 84, 1, "Right", 0, 0],
    ["Nicola Zalewski", "Inter Milan", "Midfielder", 22, 78, 21, "Left", 3, 4],
    ["Jakub Moder", "Brighton", "Midfielder", 25, 78, 15, "Right", 4, 3],
    ["Krzysztof Piatek", "Basaksehir", "Forward", 29, 78, 9, "Right", 11, 3],
    ["Karol Swiderski", "Panathinaikos", "Forward", 27, 77, 11, "Right", 7, 3],
    ["Matt Cash", "Aston Villa", "Defender", 27, 79, 2, "Right", 2, 2],
    ["Jakub Kiwior", "Arsenal", "Defender", 24, 79, 5, "Left", 1, 0],
    ["Sebastian Szymanski", "Fenerbahce", "Midfielder", 25, 79, 10, "Right", 6, 5],
    ["Przemyslaw Frankowski", "Galatasaray", "Defender", 29, 77, 21, "Right", 2, 3],
    ["Kamil Grosicki", "Pogon Szczecin", "Midfielder", 35, 74, 16, "Right", 3, 3],
    ["Michal Probierz", "Legia Warsaw", "Defender", 26, 74, 4, "Right", 1, 1],
    ["Lukasz Skorupski", "Bologna", "Goalkeeper", 33, 78, 12, "Right", 0, 0],
    ["Szymon Zurkowski", "Empoli", "Midfielder", 26, 76, 8, "Right", 3, 2],
    ["Adam Buksa", "Antalyaspor", "Forward", 28, 76, 19, "Right", 6, 2],
  ],
  Portugal: [
    ["Cristiano Ronaldo", "Al-Nassr", "Forward", 39, 88, 7, "Right", 24, 4],
    ["Bruno Fernandes", "Manchester United", "Midfielder", 30, 87, 8, "Right", 12, 10],
    ["Bernardo Silva", "Manchester City", "Midfielder", 30, 86, 20, "Right", 8, 7],
    ["Ruben Dias", "Manchester City", "Defender", 27, 86, 3, "Right", 2, 1],
    ["Joao Felix", "Chelsea", "Forward", 24, 82, 11, "Right", 8, 4],
    ["Rafael Leao", "AC Milan", "Forward", 25, 85, 10, "Right", 13, 8],
    ["Vitinha", "Paris Saint-Germain", "Midfielder", 24, 84, 17, "Right", 5, 6],
    ["Joao Cancelo", "Al-Hilal", "Defender", 30, 83, 20, "Right", 3, 5],
    ["Diogo Jota", "Liverpool", "Forward", 28, 84, 20, "Right", 15, 5],
    ["Pepe", "Porto", "Defender", 41, 78, 3, "Right", 1, 0],
    ["Ruben Neves", "Al-Hilal", "Midfielder", 27, 83, 6, "Right", 4, 4],
    ["Goncalo Ramos", "Paris Saint-Germain", "Forward", 23, 81, 9, "Right", 11, 3],
    ["Nuno Mendes", "Paris Saint-Germain", "Defender", 22, 84, 19, "Left", 2, 3],
    ["Diogo Costa", "Porto", "Goalkeeper", 25, 84, 22, "Right", 0, 0],
    ["Pedro Goncalves", "Sporting CP", "Midfielder", 26, 81, 28, "Right", 8, 4],
    ["Francisco Conceicao", "Juventus", "Forward", 21, 79, 17, "Right", 4, 4],
    ["Joao Palhinha", "Bayern Munich", "Midfielder", 28, 83, 5, "Right", 2, 2],
    ["Rui Patricio", "Atalanta", "Goalkeeper", 36, 78, 1, "Right", 0, 0],
  ],
  Senegal: [
    ["Sadio Mane", "Al-Nassr", "Forward", 32, 85, 10, "Right", 13, 6],
    ["Edouard Mendy", "Al-Ahli", "Goalkeeper", 32, 82, 16, "Right", 0, 0],
    ["Kalidou Koulibaly", "Al-Hilal", "Defender", 33, 83, 3, "Right", 2, 1],
    ["Idrissa Gueye", "Aston Villa", "Midfielder", 35, 80, 5, "Right", 3, 3],
    ["Ismaila Sarr", "Crystal Palace", "Forward", 26, 80, 18, "Right", 8, 4],
    ["Boulaye Dia", "Lazio", "Forward", 27, 79, 9, "Right", 9, 3],
    ["Pape Sarr", "Tottenham", "Midfielder", 22, 79, 19, "Right", 3, 3],
    ["Krepin Diatta", "Monaco", "Forward", 25, 78, 21, "Right", 5, 3],
    ["Pape Matar Sarr", "Tottenham", "Midfielder", 22, 78, 29, "Right", 2, 2],
    ["Moussa Niakhate", "Lyon", "Defender", 28, 79, 4, "Right", 1, 0],
    ["Nicolas Jackson", "Chelsea", "Forward", 23, 80, 15, "Right", 12, 4],
    ["Habib Diallo", "Al-Shabab", "Forward", 29, 77, 11, "Right", 8, 2],
    ["Pape Gueye", "Villarreal", "Midfielder", 25, 77, 6, "Right", 2, 2],
    ["Fode Ballo-Toure", "Hull City", "Defender", 27, 74, 2, "Left", 0, 1],
    ["Edouard Niakhate", "Nottingham Forest", "Defender", 28, 77, 4, "Right", 1, 0],
    ["Mamadou Loum", "Alanyaspor", "Midfielder", 27, 75, 8, "Right", 1, 1],
    ["Seny Dieng", "St. Gallen", "Goalkeeper", 29, 75, 1, "Right", 0, 0],
    ["Iliman Ndiaye", "Everton", "Forward", 24, 78, 10, "Right", 7, 4],
  ],
  "South Korea": [
    ["Son Heung-min", "Tottenham", "Forward", 32, 88, 7, "Right", 17, 9],
    ["Kim Min-jae", "Bayern Munich", "Defender", 28, 85, 4, "Right", 2, 1],
    ["Lee Kang-in", "Paris Saint-Germain", "Forward", 23, 82, 19, "Right", 8, 6],
    ["Hwang Hee-chan", "Wolves", "Forward", 28, 80, 11, "Right", 10, 4],
    ["Hwang In-beom", "Feyenoord", "Midfielder", 28, 80, 6, "Right", 4, 4],
    ["Kim Jin-su", "Jeonbuk", "Defender", 32, 76, 17, "Left", 1, 2],
    ["Cho Gue-sung", "Mitwillan", "Forward", 28, 77, 9, "Right", 8, 2],
    ["Hong Hyun-seok", "Mainz 05", "Midfielder", 24, 75, 14, "Right", 3, 2],
    ["Jo Hyeon-woo", "Ulsan HD", "Goalkeeper", 32, 78, 1, "Right", 0, 0],
    ["Lee Jae-sung", "Mainz 05", "Midfielder", 32, 78, 10, "Right", 5, 4],
    ["Kang Sung-jin", "FC Seoul", "Forward", 22, 73, 22, "Right", 4, 2],
    ["Park Yong-woo", "Al-Ain", "Midfielder", 31, 75, 5, "Right", 2, 2],
    ["Kim Tae-hwan", "Ulsan HD", "Defender", 32, 74, 2, "Right", 1, 2],
    ["Seol Young-woo", "Crvena Zvezda", "Defender", 26, 75, 3, "Right", 1, 1],
    ["Bae Jun-ho", "Stoke City", "Forward", 21, 74, 11, "Right", 3, 3],
    ["Jung Seung-hyun", "Al-Wasl", "Defender", 29, 74, 4, "Left", 1, 0],
    ["Song Bum-keun", "Shonan Bellmare", "Goalkeeper", 27, 74, 21, "Right", 0, 0],
    ["Um Won-sang", "Daejeon Hana", "Forward", 25, 74, 17, "Right", 5, 2],
  ],
  Spain: [
    ["Rodri", "Manchester City", "Midfielder", 28, 89, 16, "Right", 9, 9],
    ["Pedri", "Barcelona", "Midfielder", 21, 86, 8, "Right", 6, 7],
    ["Gavi", "Barcelona", "Midfielder", 20, 83, 9, "Right", 4, 3],
    ["Lamine Yamal", "Barcelona", "Forward", 17, 86, 19, "Left", 13, 11],
    ["Alvaro Morata", "AC Milan", "Forward", 32, 82, 7, "Right", 12, 4],
    ["Dani Olmo", "Barcelona", "Midfielder", 26, 85, 19, "Right", 8, 6],
    ["Ferran Torres", "Barcelona", "Forward", 24, 81, 11, "Right", 9, 4],
    ["Aymeric Laporte", "Al-Nassr", "Defender", 30, 83, 14, "Right", 2, 1],
    ["Dani Carvajal", "Real Madrid", "Defender", 32, 84, 2, "Right", 3, 3],
    ["Mikel Oyarzabal", "Real Sociedad", "Forward", 27, 82, 7, "Left", 11, 5],
    ["Unai Simon", "Athletic Bilbao", "Goalkeeper", 27, 83, 1, "Right", 0, 0],
    ["Marc Cucurella", "Chelsea", "Defender", 26, 80, 3, "Left", 2, 3],
    ["Pablo Sarabia", "Wolves", "Midfielder", 32, 79, 22, "Right", 4, 4],
    ["Mikel Merino", "Arsenal", "Midfielder", 28, 83, 23, "Right", 3, 4],
    ["Nico Williams", "Athletic Bilbao", "Forward", 22, 84, 11, "Right", 11, 7],
    ["David Raya", "Arsenal", "Goalkeeper", 29, 82, 22, "Right", 0, 0],
    ["Robin Le Normand", "Atletico Madrid", "Defender", 28, 82, 24, "Right", 1, 1],
    ["Fabián Ruiz", "Paris Saint-Germain", "Midfielder", 28, 82, 8, "Left", 5, 4],
  ],
  Sweden: [
    ["Dejan Kulusevski", "Tottenham", "Midfielder", 24, 83, 21, "Right", 8, 7],
    ["Viktor Gyokeres", "Sporting CP", "Forward", 26, 84, 9, "Right", 29, 7],
    ["Alexander Isak", "Newcastle United", "Forward", 25, 85, 14, "Right", 21, 5],
    ["Emil Forsberg", "New York Red Bulls", "Midfielder", 33, 80, 10, "Right", 6, 4],
    ["Robin Olsen", "Aston Villa", "Goalkeeper", 34, 78, 1, "Right", 0, 0],
    ["Victor Lindelof", "Manchester United", "Defender", 30, 80, 2, "Right", 1, 1],
    ["Lucas Holmgren", "Brentford", "Goalkeeper", 24, 76, 13, "Right", 0, 0],
    ["Isak Ayan", "Ajax", "Forward", 22, 76, 11, "Right", 6, 3],
    ["Karl-Johan Johnsson", "Strasbourg", "Goalkeeper", 34, 75, 12, "Right", 0, 0],
    ["Anton Saletros", "Rosenborg", "Midfielder", 27, 75, 8, "Right", 3, 3],
    ["Sebastian Nanasi", "Strasbourg", "Midfielder", 22, 78, 10, "Right", 5, 4],
    ["Hjalmar Ekdal", "Burnley", "Defender", 26, 76, 4, "Right", 1, 0],
    ["Emil Krafth", "Newcastle United", "Defender", 30, 77, 2, "Right", 1, 1],
    ["Mattias Svanberg", "Wolfsburg", "Midfielder", 25, 77, 14, "Right", 2, 2],
    ["Ken Sema", "Watford", "Midfielder", 31, 76, 7, "Left", 3, 3],
    ["Gustaf Nilsson", "Club Brugge", "Forward", 27, 75, 9, "Right", 7, 2],
    ["Pierre Bengtsson", "Copenhagen", "Defender", 32, 74, 3, "Left", 0, 1],
    ["Joel Andersson", "Mainz 05", "Defender", 28, 75, 5, "Right", 1, 1],
  ],
  Uruguay: [
    ["Federico Valverde", "Real Madrid", "Midfielder", 26, 88, 15, "Right", 8, 7],
    ["Darwin Nunez", "Liverpool", "Forward", 25, 82, 11, "Right", 15, 5],
    ["Ronald Araujo", "Barcelona", "Defender", 25, 85, 4, "Right", 2, 1],
    ["Sergio Rochet", "Inter Miami", "Goalkeeper", 32, 79, 23, "Right", 0, 0],
    ["Jose Maria Gimenez", "Atletico Madrid", "Defender", 29, 83, 2, "Right", 2, 0],
    ["Manuel Ugarte", "Manchester United", "Midfielder", 23, 82, 25, "Right", 2, 3],
    ["Nicolas de la Cruz", "Flamengo", "Midfielder", 27, 80, 10, "Right", 6, 5],
    ["Maxi Araujo", "Tijuana", "Midfielder", 24, 78, 8, "Left", 4, 3],
    ["Brian Rodriguez", "Atletico San Luis", "Forward", 24, 78, 11, "Right", 5, 3],
    ["Facundo Pellistri", "Panathinaikos", "Forward", 23, 76, 16, "Right", 3, 3],
    ["Mathias Olivera", "Napoli", "Defender", 27, 80, 17, "Left", 1, 2],
    ["Santiago Bueno", "Girona", "Defender", 26, 77, 3, "Right", 1, 0],
    ["Giorgian de Arrascaeta", "Flamengo", "Midfielder", 30, 81, 10, "Right", 8, 6],
    ["Sebastian Caceres", "America", "Defender", 25, 77, 4, "Right", 1, 1],
    ["Facundo Torres", "Palmeiras", "Forward", 24, 79, 7, "Right", 9, 4],
    ["Agustin Canobbio", "Athletico Paranaense", "Midfielder", 26, 76, 14, "Right", 4, 3],
    ["Matias Vina", "Flamengo", "Defender", 26, 77, 2, "Left", 1, 1],
    ["Franco Israel", "Sporting CP", "Goalkeeper", 24, 76, 1, "Right", 0, 0],
  ],
};

function seeded(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function slug(name, country) {
  return `${country.toLowerCase().replace(/\s+/g, "-")}-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
}

function build() {
  const players = [];
  let id = 1;
  for (const [country, code, confed] of COUNTRIES) {
    const roster = ROSTER[country];
    if (!roster) continue;
    for (const [name, club, position, age, rating, jersey, foot, goals, assists] of roster) {
      const rnd = seeded(id * 7 + rating);
      const assistMod = position === "Goalkeeper" ? 0 : assists;
      const isFit = rnd() > 0.12;
      const injuryStatus = isFit ? "Fit" : rnd() > 0.5 ? "Doubtful" : "Injured";
      const injuryType = isFit ? null : ["Hamstring", "Knee", "Ankle", "Groin"][Math.floor(rnd() * 4)];
      const fitness = isFit ? 88 + Math.floor(rnd() * 12) : 55 + Math.floor(rnd() * 25);
      const form = isFit ? 5 + rnd() * 4.5 : 2 + rnd() * 3;
      const passAcc = position === "Goalkeeper" ? 65 + Math.floor(rnd() * 15) : 78 + Math.floor(rnd() * 18);
      const xg = position === "Forward" ? goals * (0.85 + rnd() * 0.3) : position === "Midfielder" ? goals * 0.7 : 0.5;
      const xa = assistMod * (0.85 + rnd() * 0.3);
      const shots = position === "Forward" ? 50 + Math.floor(rnd() * 60) : position === "Midfielder" ? 30 + Math.floor(rnd() * 40) : 5 + Math.floor(rnd() * 10);
      const dribbles = position === "Forward" ? 20 + Math.floor(rnd() * 50) : position === "Midfielder" ? 15 + Math.floor(rnd() * 35) : 2 + Math.floor(rnd() * 8);
      const tackles = position === "Defender" ? 40 + Math.floor(rnd() * 40) : position === "Midfielder" ? 25 + Math.floor(rnd() * 30) : 4 + Math.floor(rnd() * 10);
      const interceptions = position === "Defender" ? 30 + Math.floor(rnd() * 30) : 8 + Math.floor(rnd() * 20);
      const ownership = position === "Forward" ? 15 + rnd() * 60 : 5 + rnd() * 35;
      const captScore = Math.min(99, Math.round(rating * 0.6 + goals * 1.2 + form * 4));
      const vcScore = Math.min(95, Math.round(rating * 0.5 + assists * 1.1 + form * 3.5));
      const aiValue = Math.min(99, Math.round((expectedPointsCalc(rating, goals, assists, form)) * 3 + rating * 0.4));
      const height = 170 + Math.floor(rnd() * 25) + (position === "Goalkeeper" || position === "Defender" ? 8 : 0);
      const price = priceCalc(rating, position);
      const xpts = expectedPointsCalc(rating, goals, assists, form);
      const marketValue = Math.round((rating - 60) * (rating - 60) * 0.6) * 1000000;

      players.push({
        player_id: slug(name, country),
        name, club, position, age, rating, jersey, foot, goals, assists,
        country, country_code: code, confederation: confed,
        height: `${height} cm`,
        market_value: marketValue,
        fantasy_price: price,
        expected_points: Number(xpts.toFixed(1)),
        xg: Number(xg.toFixed(2)),
        xa: Number(xa.toFixed(2)),
        pass_accuracy: passAcc,
        shots, dribbles, tackles, interceptions,
        fitness,
        injury_status: injuryStatus,
        injury_type: injuryType,
        form: Number(form.toFixed(1)),
        ownership_percentage: Number(ownership.toFixed(1)),
        captain_score: captScore,
        vice_captain_score: vcScore,
        ai_value_score: aiValue,
      });
      id++;
    }
  }
  return players;
}

function priceCalc(rating, position) {
  const base = Math.max(4, Math.round((rating - 60) * 0.55));
  const posMod = position === "Forward" ? 2.5 : position === "Midfielder" ? 1.5 : position === "Defender" ? 0.8 : 0.5;
  return Number(Math.min(15, base + posMod).toFixed(1));
}

function expectedPointsCalc(rating, goals, assists, form) {
  return Number((rating * 0.18 + goals * 0.9 + assists * 0.7 + form * 1.4).toFixed(1));
}

const players = build();

// SQL
function sqlStr(v) {
  if (v === null || v === undefined) return "NULL";
  if (typeof v === "number") return String(v);
  return `'${String(v).replace(/'/g, "''")}'`;
}

const cols = [
  "player_id","name","photo","country","country_code","club","club_logo","position","age","height",
  "preferred_foot","overall_rating","market_value","fantasy_price","expected_points","goals","assists",
  "xg","xa","pass_accuracy","shots","dribbles","tackles","interceptions","fitness","injury_status",
  "injury_type","form","ownership_percentage","captain_score","vice_captain_score","ai_value_score","jersey_number"
];

const values = players.map(p => {
  const row = [
    p.player_id, p.name, null, p.country, p.country_code, p.club, null, p.position, p.age, p.height,
    p.foot, p.rating, p.market_value, p.fantasy_price, p.expected_points, p.goals, p.assists,
    p.xg, p.xa, p.pass_accuracy, p.shots, p.dribbles, p.tackles, p.interceptions, p.fitness, p.injury_status,
    p.injury_type, p.form, p.ownership_percentage, p.captain_score, p.vice_captain_score, p.ai_value_score, p.jersey_number
  ];
  return `(${row.map(sqlStr).join(",")})`;
});

const sql = `/* Seed players roster */\nINSERT INTO players (${cols.join(",")}) VALUES\n${values.join(",\n")}\nON CONFLICT (player_id) DO NOTHING;`;

writeFileSync(new URL("../src/lib/playersData.ts", import.meta.url), `import type { Player } from "./types";\n\nexport const PLAYERS: Player[] = ${JSON.stringify(players, null, 2)};\n`);
writeFileSync(new URL("./seed-players.sql", import.meta.url), sql);

console.log(`Generated ${players.length} players`);
const counts = {};
players.forEach(p => counts[p.country] = (counts[p.country]||0)+1);
console.log(counts);
