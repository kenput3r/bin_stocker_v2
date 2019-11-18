import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import BinSelect from './BinSelect';
import { Grid, Button } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import PostTransfer from '../utils/PostTransfer';

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const headCells = [
  { id: 'qty', numeric: true, disablePadding: false, label: 'QTY', class: 'qty' },
  { id: 'sku', numeric: false, disablePadding: true, label: 'SKU', class: 'sku' },
  { id: 'name', numeric: false, disablePadding: false, label: 'NAME', class: 'name' },
  { id: 'from_bin', numeric: false, disablePadding: false, label: 'FROM', class: 'from-location' },
  { id: 'to_bin', numeric: false, disablePadding: false, label: 'TO', class: 'to-location' }
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" className="hide-on-print">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
            className={headCell.class}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={order}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { numSelected } = props;
  const [dense, setDense] = React.useState(false);
  const handleChangeDense = event => {
    setDense(event.target.checked);
    props.handleChangeDense(event.target.checked)
  };

  return (
    <Toolbar
      className={"hide-on-print " + clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Small Rows"
      />
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle">
          Items To Transfer
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={props.handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    paddingBottom: 50
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  progressBar: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
      marginBottom: 50
    },
  },
  progressMessage: {
    fontWeight: 'normal', 
    marginBlockStart: '2em', 
    marginBlockEnd: '2.5em', 
    textTransform: 'uppercase'
  },
}));

export default function EnhancedTable(props) {
  const classes = useStyles();
  const [rows, setRows] = React.useState(props.rows);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [progressMessage, setProgressMessage] = React.useState('CLICK TRANSFER TO START TRANSFERRING');
  const [completed, setCompleted] = React.useState(0);

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, index) => {
    const selectedIndex = selected.indexOf(index);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, index);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = dense => {
    setDense(dense);
  };

  const handleDelete = () => {
    let data = rows;
    while(selected.length) {
      let delete_id = parseInt(selected.shift());
      console.log('delete id: ', delete_id)
      for(let i = 0; i < data.length; i++) {
        let id = parseInt(data[i].id);
        if(id === delete_id) {
          data.splice(i, 1);
          break;
        }
      }
    }
    setRows(data);
    setSelected([]);
  }

  const updateRow = (row) => {
    const temp_rows = [...rows];
    for(let i = 0; i < temp_rows.length; i++) {
      if(temp_rows[i].id === row.id) {
        temp_rows.splice(i, 1, row);
        break;
      }
    }
    setRows(temp_rows);
  }

  const sendUpdate = (remaining_rows, row) => {
    if(row) {
      updateRow(row);
    }
    const current_row = rows.length - remaining_rows;
    const percent_done = current_row / rows.length * 100;
    let message = `TRANSFERRING: ${current_row} of ${rows.length}`;
    if(!remaining_rows) {
      message = 'TRANSFER COMPLETE';
    }
    setCompleted(percent_done);
    setProgressMessage(message);
    console.log('we updating sometin');
  }

  const handleStart = () => {
    sendUpdate(rows.length);
    const warehouse = props.fromLocation === 'Townsend' ? 'Townsend' : 'Main Warehouse';
    PostTransfer(rows, sendUpdate, warehouse);
  }

  const isSelected = id => selected.indexOf(id) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} handleChangeDense={handleChangeDense} handleDelete={handleDelete} />
        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      // onClick={event => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      className={row.cssClass}
                    >
                      <TableCell className="hide-on-print" padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                          onClick={event => handleClick(event, row.id)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          selected={isItemSelected}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.qty}
                      </TableCell>
                      <TableCell align="left">{row.sku}</TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">{row.from_bin}</TableCell>
                      <TableCell align="left">
                        {row.to_bin === '?' ? <BinSelect toLocation={props.toLocation} row={row} updateRow={updateRow} bins={props.bins} /> : row.to_bin}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[10, 50, 100, 200, 500]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'previous page',
          }}
          nextIconButtonProps={{
            'aria-label': 'next page',
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
        <Grid container spacing={0} direction="row" justify="center">
          <Grid container item xs={12} justify="center">
            <Button variant="outlined" color="primary" className={classes.button} onClick={handleStart}>
              Transfer
            </Button>
          </Grid>
          <Grid container item xs={6} justify="center">
            <h5 className={classes.progressMessage}>{progressMessage}</h5>
            <div className={classes.progressBar}>
              <LinearProgress variant="determinate" value={completed} />
            </div>
          </Grid>
        </Grid>
    </div>
  );
}