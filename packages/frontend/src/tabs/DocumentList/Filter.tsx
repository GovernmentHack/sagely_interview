import { Box, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Typography } from "@mui/material";
import React from "react";

interface FilterParams {
  possibleTags?: string[];
  tags?: string[];
  setTags: Function;
}
export const Filter = ({ possibleTags, tags, setTags }: FilterParams): JSX.Element => {
  const handleChange = (event: SelectChangeEvent<typeof tags>) => {
    const {
      target: { value },
    } = event;
    setTags(
      typeof value === 'string' ? value.split(',') : value
    );
  };

  return (
    <Box sx={{ margin: "16px 0 0 0", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      <Typography variant="overline" sx={{ flex: "1 0 auto", margin: "0 0 0 16px" }}>
        Filter
      </Typography>
      <FormControl
        sx={{
          m: 1,
          width: 300,
          flex: "1 0 auto"
        }}
      >
        <InputLabel id="tag-filter-label">Tags</InputLabel>
        <Select
          labelId="tag-filter-label"
          id="tag-filter"
          multiple
          value={tags}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Tag" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          disabled={!possibleTags?.length}
        >
          {possibleTags?.length && possibleTags.map((tag) => (
            <MenuItem
              key={tag}
              value={tag}
            >
              {tag}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
