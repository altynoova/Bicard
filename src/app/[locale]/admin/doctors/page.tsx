'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Box,
  Button,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import DashboardCard from '@/components/Adminv2/Shared/DashboardCard';
import useDoctorStore from '@/store/useDoctorStore';
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Image from 'next/image';

const Doctors = () => {
  const { FetchDoctors, DeleteDoctor } = useDoctorStore();
  const { doctors } = useDoctorStore();

  const [search, setSearch] = useState<string>('');
  const [openDoctorId, setOpenDoctorId] = useState<number | null>(null);

  const filteredDoctors = doctors.filter(
    (doctor) => doctor?.name?.includes(search) || doctor.name == null
  );

  const handleDelete = async (id: number) => {
    const status = await DeleteDoctor(id);
    if (status == 200) {
      SuccessAlert('Successfully deleted');
    } else {
      ErrorAlert('Произошла ошибка!');
    }
  };

  useEffect(() => {
    FetchDoctors();
  }, []);

  const toggleBio = (id: number) => {
    setOpenDoctorId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div>
      <div className="d-flex justify-content-center mb-5">
        <Link href="doctors/create">Добавить доктора</Link>
      </div>
      <DashboardCard title="Doctors">
        <Box sx={{ overflow: 'auto' }}>
          <Box sx={{ width: '100%', display: 'table', tableLayout: 'fixed' }}>
            <Table
              sx={{
                whiteSpace: 'nowrap',
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      №
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      IMG
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Name
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Speciality
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Education
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Experience
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      PhoneNumber
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Email
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Address
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Edit
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="subtitle2" fontWeight={600}>
                      Delete
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredDoctors.map((doctor, index) => (
                  <React.Fragment key={doctor.id}>
                    <TableRow>
                      <TableCell>
                        <IconButton
                          aria-label="expand service"
                          size="small"
                          onClick={() => toggleBio(doctor.id)}
                        >
                          {openDoctorId === doctor.id ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <KeyboardArrowDownIcon />
                          )}
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <Typography
                          color="textSecondary"
                          variant="subtitle2"
                          fontWeight={400}
                        >
                          {index + 1}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                          <Image
                            width={50}
                            height={50}
                            src={`data:image/png;base64, ${doctor.photoBase64}`}
                            alt={doctor.name}
                          />
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {doctor.name == null ? <i>null</i> : doctor.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          color="textSecondary"
                          variant="subtitle2"
                          fontWeight={400}
                        >
                          {doctor.speciality == null ? <i>null</i> : doctor.speciality}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          color="textSecondary"
                          variant="subtitle2"
                          fontWeight={400}
                        >
                          {doctor.education == null ? <i>null</i> : doctor.education}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          color="textSecondary"
                          variant="subtitle2"
                          fontWeight={400}
                        >
                          {doctor.experience == null ? <i>null</i> : doctor.experience}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          color="textSecondary"
                          variant="subtitle2"
                          fontWeight={400}
                        >
                          {doctor.phoneNumber == null ? <i>null</i> : doctor.phoneNumber}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          color="textSecondary"
                          variant="subtitle2"
                          fontWeight={400}
                        >
                          {doctor.email == null ? <i>null</i> : doctor.email}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          color="textSecondary"
                          variant="subtitle2"
                          fontWeight={400}
                        >
                          {doctor.address == null ? <i>null</i> : doctor.address}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Link href={`/admin/doctors/edit/${doctor.id}`}>
                          <EditIcon color={'warning'} />
                        </Link>
                      </TableCell>
                      <TableCell align="right">
                        <Button onClick={() => handleDelete(doctor.id)}>
                          <DeleteOutlineIcon color={'error'} />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                        <Collapse in={openDoctorId === doctor.id} timeout="auto" unmountOnExit>
                          <Typography
                            sx={{ marginY: 2 }}
                            variant="h6"
                            gutterBottom
                            component="div"
                          >
                            {doctor.bio}
                          </Typography>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Box>
      </DashboardCard>
    </div>
  );
};

export default Doctors;
