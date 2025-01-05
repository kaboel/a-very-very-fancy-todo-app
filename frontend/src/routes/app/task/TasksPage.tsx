import { Box, Button, Grid2 as Grid, IconButton, Tooltip } from "@mui/material"
import { useNavigate } from "react-router"
import TaskItem from "../../../components/TaskItem"
import Add from "@mui/icons-material/Add"
import Tune from "@mui/icons-material/Tune"
import { useGetTasksQuery } from "../../../redux/apis/tasksApi"
import { ITask } from "../../../helpers/types"
import { useSelector } from "react-redux"
import { selectTasks } from "../../../redux/slices/tasksSlice"
import { useState } from "react"
import TasksFilter, { ITasksFilter } from "../../../components/TasksFilter"
import { useGetPatientsQuery } from "../../../redux/apis/patientApi"

export default function TasksPage() {
  const navigate = useNavigate()
  const { isLoading: patientsLoading } = useGetPatientsQuery()
  const [filterOpen, setFilterOpen] = useState(false)
  const [filters, setFilters] = useState<ITasksFilter>({})
  const { isLoading: tasksLoading } = useGetTasksQuery(filters)
  const tasks = useSelector(selectTasks)

  const handleApplyFilters = (appliedFilters: ITasksFilter) => {
    setFilters(appliedFilters || {})
    setFilterOpen(false)
  }

  return (
    <Box>
      <Grid container sx={{ py: 2, px: 4 }}>
        <Grid>
          <Button
            startIcon={<Add />}
            variant="contained"
            onClick={() => navigate("/tasks/upsert")}
          >
            Create Task
          </Button>
        </Grid>
        <Grid sx={{ textAlign: "right", flexGrow: 1 }}>
          <Tooltip
            title="Filtering and Sorting"
            onClick={() => setFilterOpen((prev: boolean) => !prev)}
          >
            <IconButton>
              <Tune />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      <Box sx={{ px: 2 }}>
        {tasksLoading && patientsLoading ? (
          <div>Loading data...</div>
        ) : (
          tasks?.map((item: ITask) => <TaskItem key={item?.id} task={item} />)
        )}
      </Box>

      <TasksFilter
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        onApply={handleApplyFilters} // Pass callback to apply filters
      />
    </Box>
  )
}
