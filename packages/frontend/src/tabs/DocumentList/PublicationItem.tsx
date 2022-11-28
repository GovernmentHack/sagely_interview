import React from "react";
import { Box, Card, CardContent, Chip, Divider, FormControl, IconButton, InputLabel, List, ListItem, ListItemIcon, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent, Skeleton, TablePagination, Tooltip, Typography } from "@mui/material";
import BookIcon from "@mui/icons-material/Book";
import RssFeedIcon from '@mui/icons-material/RssFeed';
import WebIcon from '@mui/icons-material/Web';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import SchoolIcon from '@mui/icons-material/School';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import InfoIcon from '@mui/icons-material/Info';

enum ITEM_TYPE {
  WEBPAGE = "webpage",
  VIDEO_RECORDING = "videoRecording",
  MAGAZINE_ARTICLE = "magazineArticle",
  BLOG_POST = "blogPost",
  BOOK = "book",
}

export type Publication = {
  url: string;
  manualTags: string[];
  abstractNote: string;
  date: Date;
  dateAdded: Date;
  dateModified: Date;
  accessDate: Date;
  key: string;
  itemType: ITEM_TYPE;
  publicationYear: number;
  author: string;
  title: string;
}

interface PublicationTooltipProps {
  publication: Publication;
}

const PublicationMoreInfo = ({ publication }: PublicationTooltipProps) => {
  return (
    <Card sx={{ maxWidth: "50vw", minWidth: "256px" }}>
      <CardContent>
        <Typography variant="h6">
          {publication.title}
        </Typography>
        <Typography sx={{ fontSize: 12 }} color="text.secondary">
          {publication.author}
        </Typography>
        <Typography sx={{ fontSize: 12 }} color="text.secondary">
          {new Date(publication.date).toISOString().split('T')[0]}
        </Typography>
        <Divider textAlign="left" sx={{ margin: "8px 0 8px 0" }}>Description</Divider>
        <Typography variant="body2" sx={{ maxHeight: "128px", overflow: "auto" }}>
          {publication.abstractNote}
        </Typography>
        <Divider textAlign="left" sx={{ margin: "8px 0 8px 0" }}>Tags</Divider>
        <Box sx={{
          display: "flex",
          alignContent: "flex-start",
          flexWrap: "wrap",
          gap: "8px",
        }}>
          {publication.manualTags.map((tag) => <Chip label={tag} variant="outlined" key={tag} />)}
        </Box>
      </CardContent>
    </Card>
  )
}

const PublicationDates = ({ publication }: PublicationTooltipProps) => {
  return (
    <Card sx={{ maxWidth: "20vw", minWidth: "256px" }}>
      <CardContent>
        <Typography variant="overline">
          Added
        </Typography>
        <Typography sx={{ fontSize: 12 }} color="text.secondary">
          {new Date(publication.dateAdded).toLocaleString()}
        </Typography>
        <Typography variant="overline">
          last modified
        </Typography>
        <Typography sx={{ fontSize: 12 }} color="text.secondary">
          {new Date(publication.dateModified).toLocaleString()}
        </Typography>
        <Typography variant="overline">
          last accessed
        </Typography>
        <Typography sx={{ fontSize: 12 }} color="text.secondary">
          {new Date(publication.accessDate).toLocaleString()}
        </Typography>
      </CardContent>
    </Card >
  )
}

const getPublicationIcon = (itemType: ITEM_TYPE) => {
  switch (itemType) {
    case ITEM_TYPE.BLOG_POST:
      return <RssFeedIcon />;
    case ITEM_TYPE.BOOK:
      return <BookIcon />;
    case ITEM_TYPE.WEBPAGE:
      return <WebIcon />;
    case ITEM_TYPE.MAGAZINE_ARTICLE:
      return <ImportContactsIcon />;
    case ITEM_TYPE.VIDEO_RECORDING:
      return <OndemandVideoIcon />;
    default:
      return <SchoolIcon />;
  }
}

const getSecondaryPeek = (text: string) => {
  if (text.length > 90) {
    return `${text.slice(0, 86)} ...`;
  } else {
    return text;
  }
}

export const PublicationItem = ({ publication }: { publication: Publication }) => {
  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="link" color="secondary" onClick={() => window.open(publication.url, "_blank")}>
          <OpenInNewIcon />
        </IconButton>
      }
      sx={{
        minWidth: "50vw",
      }}
      key={publication.key}
    >
      <ListItemIcon>
        <Tooltip
          title={
            <PublicationMoreInfo publication={publication} />
          }
          placement={"bottom-start"}
        >
          {getPublicationIcon(publication.itemType)}
        </Tooltip>
      </ListItemIcon>
      <ListItemText primary={publication.title || publication.url.slice(0, 70)} secondary={getSecondaryPeek(publication.abstractNote)} />
      <ListItemIcon>
        <Tooltip
          title={
            <PublicationDates publication={publication} />
          }
          placement={"bottom-start"}
        >
          <InfoIcon />
        </Tooltip>
      </ListItemIcon>
    </ListItem>
  )
}