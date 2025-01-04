import { Grid2 as Grid, Box, Typography } from "@mui/material"
import { TASK_STATUS } from "../helpers/constants"
import { ITaskStatus } from "../helpers/types"

interface ISummary {
  status: ITaskStatus
  count: number
}

const renderSummary = ({ status, count }: ISummary) => {
  const style = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }

  let color = "default"
  let readableStatus = "New"

  switch (status) {
    case TASK_STATUS.COMPLETE:
      color = "success"
      readableStatus = "Complete"
      break
    case TASK_STATUS.INPROGRESS:
      color = "primary"
      readableStatus = "Ongoing"
      break
    case TASK_STATUS.OVERDUE:
      color = "error"
      readableStatus = "Due"
      break
  }

  return (
    <Grid size="grow" sx={style}>
      <Typography variant="h5" color={color}>
        {count}
      </Typography>
      <Typography variant="caption" color={color}>
        {readableStatus}
      </Typography>
    </Grid>
  )
}

export default function TasksSummary() {
  return (
    <Box padding={2} pt={1}>
      <Typography color="#BBB" variant="subtitle2">
        My Tasks
      </Typography>
      <Grid container spacing={2}>
        {renderSummary({ status: TASK_STATUS.NEW, count: 10 })}
        {renderSummary({ status: TASK_STATUS.COMPLETE, count: 10 })}
        {renderSummary({ status: TASK_STATUS.OVERDUE, count: 10 })}
      </Grid>
    </Box>
  )
}
