import readLastLines from "read-last-lines";

export default async (req, res) => {
  const lastLine = await readLastLines.read("./state/temperature.log", 1);

  const [date, actualTemp, actualHum] = String(lastLine).split(" ");

  res.status(200).json({
    date,
    actualTemp,
    actualHum,
  });
};
