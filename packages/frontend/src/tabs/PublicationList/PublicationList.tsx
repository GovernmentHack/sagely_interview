import { List, Skeleton, TablePagination, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./PublicationList.css";
import { useAxios } from "../../utils/useAxios";
import { Publication, PublicationItem } from "./PublicationItem";
import { Filter } from "./Filter";

type PublicationsResponse = {
  maxCount: number;
  publications: Publication[];
};

type TagsResponse = string[];

/**
 * PublicationTab
 *
 * Renders the tab to show all the Publications, and the filter menu. Will also show loading and error state when fetching data
 *
 */
export const PublicationTab: React.FunctionComponent = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tags, setTags] = useState<string[]>([]);
  const [publicationsParams, setPublicationsParams] = useState<{
    pageSize: number;
    page: number;
    tagFilter: string[];
  }>({
    pageSize: 10,
    page: 0,
    tagFilter: [],
  });

  const { response: possibleTags, error: tagsError } = useAxios<
    undefined,
    TagsResponse
  >({
    method: "GET",
    url: "/tags",
  });

  // prevents infitinite looping when passing state controlled variables directly as parameters to useAxios
  useEffect(() => {
    setPublicationsParams({
      pageSize: rowsPerPage,
      page,
      tagFilter: tags,
    });
  }, [page, rowsPerPage, tags]);

  const {
    response: publicationsResponse,
    loading: publicationsLoading,
    error: publicationsError,
  } = useAxios<undefined, PublicationsResponse>({
    method: "GET",
    url: "/publications",
    params: publicationsParams,
  });

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  };

  return (
    <div aria-label="Document List" className="document-list">
      {!tagsError && possibleTags.length && (
        <Filter
          tags={tags}
          setTags={setTags as Function}
          possibleTags={possibleTags}
        />
      )}
      {tagsError && (
        <Typography
          variant="overline"
          color="error"
        >{`Could not fetch all possible tags: ${tagsError}`}</Typography>
      )}
      {publicationsLoading && (
        <>
          <Skeleton
            animation="wave"
            sx={{ minWidth: "50vw", margin: "4px 0 4px 0" }}
            variant="rectangular"
            height={64}
          />
          <Skeleton
            animation="wave"
            sx={{ minWidth: "50vw", margin: "4px 0 4px 0" }}
            variant="rectangular"
            height={64}
          />
          <Skeleton
            animation="wave"
            sx={{ minWidth: "50vw", margin: "4px 0 4px 0" }}
            variant="rectangular"
            height={64}
          />
        </>
      )}
      {publicationsError && (
        <Typography
          variant="overline"
          color="error"
        >{`Could not fetch publications: ${publicationsError}`}</Typography>
      )}
      {publicationsResponse?.publications?.length &&
        !publicationsError &&
        !publicationsLoading && (
          <>
            <List>
              {publicationsResponse.publications.map((publication) => (
                <PublicationItem
                  publication={publication}
                  key={publication.key}
                />
              ))}
            </List>
            <TablePagination
              component="div"
              count={publicationsResponse.maxCount}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
    </div>
  );
};
