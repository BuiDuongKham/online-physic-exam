import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const MCQuestion = (props: any) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (event: any) => {
    console.log(event.target)
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    props.onAnswer(props.id, selectedValue);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="h2">
          {props.title}
        </Typography>
        {props.image && <img src={`data:image/jpeg;base64,${props.image}`} alt="" />}
        <RadioGroup
          aria-label={`question${props.id}`}
          name={`question${props.id}`}
          value={selectedOption}
          onChange={handleOptionChange}
        >
          {props.options.map((option: string, index: number) => (
            <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default MCQuestion;