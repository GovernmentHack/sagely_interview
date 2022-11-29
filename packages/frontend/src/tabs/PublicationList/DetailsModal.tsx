import { Box, Chip, Divider, Modal, Typography } from "@mui/material";
import React from "react";
import { Publication } from "./PublicationItem";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};

type DetailsModalProps = {
  open: boolean;
  handleClose: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
  publication: Publication;
};

export const DetailsModal = ({
  open,
  handleClose,
  publication,
}: DetailsModalProps) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-publication-title"
      aria-describedby="modal-modal-publication-details"
    >
      <Box sx={style}>
        <Typography variant="h6" id="modal-modal-publication-title">
          {publication.title}
        </Typography>
        <Typography sx={{ fontSize: 12 }} color="text.secondary">
          {publication.author}
        </Typography>
        <Typography sx={{ fontSize: 12 }} color="text.secondary">
          {new Date(publication.date).toISOString().split("T")[0]}
        </Typography>
        <Divider textAlign="left" sx={{ margin: "8px 0 8px 0" }}>
          Description
        </Divider>
        <Typography
          variant="body2"
          sx={{ maxHeight: "80vh", overflow: "auto" }}
          id="modal-modal-publication-details"
        >
          {publication.abstractNote}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            justifyContent: "spaceBetween",
            alignItems: "stretch",
          }}
        >
          <Box
            sx={{
              flex: "1 1 auto",
              margin: "0 16px 0 0",
            }}
          >
            <Divider textAlign="left" sx={{ margin: "8px 0 8px 0" }}>
              Tags
            </Divider>
            <Box
              sx={{
                display: "flex",
                alignContent: "flex-start",
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              {publication.manualTags.map((tag) => (
                <Chip label={tag} variant="outlined" key={tag} />
              ))}
            </Box>
          </Box>
          <Box
            sx={{
              flex: "1 0 auto",
            }}
          >
            <Divider textAlign="left" sx={{ margin: "8px 0 8px 0" }}>
              Metadata
            </Divider>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "nowrap",
                justifyContent: "spaceBetween",
                alignItems: "stretch",
              }}
            >
              <Box
                sx={{
                  flex: "1 0 auto",
                }}
              >
                <Typography variant="overline">Added</Typography>
                <Typography sx={{ fontSize: 12 }} color="text.secondary">
                  {new Date(publication.dateAdded).toLocaleString()}
                </Typography>
              </Box>
              <Box
                sx={{
                  flex: "1 0 auto",
                }}
              >
                <Typography variant="overline">last modified</Typography>
                <Typography sx={{ fontSize: 12 }} color="text.secondary">
                  {new Date(publication.dateModified).toLocaleString()}
                </Typography>
              </Box>
              <Box
                sx={{
                  flex: "1 1 auto",
                }}
              >
                <Typography variant="overline">last accessed</Typography>
                <Typography sx={{ fontSize: 12 }} color="text.secondary">
                  {new Date(publication.accessDate).toLocaleString()}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
