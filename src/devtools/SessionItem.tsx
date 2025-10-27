import React from 'react';
import './App.css';
import {
    ListItemText, MenuItem, Divider, IconButton, Typography, ListItemIcon,
} from '@mui/material';
import { Session } from './types'
import FileCopyIcon from '@mui/icons-material/FileCopy';
import EditIcon from '@mui/icons-material/Edit';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import StyledMenu from './StyledMenu';

export interface Props {
    session: Session
    selected: boolean
    switchMe: () => void
    deleteMe: () => void
    copyMe: () => void
    editMe: () => void
    onDragStart: (e: React.DragEvent) => void
    onDragEnd: (e: React.DragEvent) => void
    onDragOver: (e: React.DragEvent) => void
    onDrop: (e: React.DragEvent) => void
}

export default function SessionItem(props: Props) {
    const { session, selected, switchMe, deleteMe, copyMe, editMe, onDragStart, onDragEnd, onDragOver, onDrop } = props
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [isDragging, setIsDragging] = React.useState(false);
    const [isDragOver, setIsDragOver] = React.useState(false);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault()
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <MenuItem
            key={session.id}
            selected={selected}
            draggable={true}
            onClick={() => switchMe()}
            onDragStart={(e) => {
                setIsDragging(true);
                onDragStart(e);
            }}
            onDragEnd={(e) => {
                setIsDragging(false);
                onDragEnd(e);
            }}
            onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
                onDragOver(e);
            }}
            onDragLeave={() => {
                setIsDragOver(false);
            }}
            onDrop={(e) => {
                setIsDragOver(false);
                onDrop(e);
            }}
            sx={{
                opacity: isDragging ? 0.5 : 1,
                borderTop: isDragOver ? '2px solid #1976d2' : 'none',
                transition: 'all 0.2s ease',
                cursor: 'move',
            }}
        >
            <ListItemIcon>
                <IconButton><ChatBubbleOutlineOutlinedIcon fontSize="small" /></IconButton>
            </ListItemIcon>
            <ListItemText>
                <Typography variant="inherit" noWrap>
                    {session.name}
                </Typography>
            </ListItemText>
            <IconButton onClick={handleClick}>
                <MoreHorizOutlinedIcon />
            </IconButton>
            <StyledMenu
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem key={session.id + 'edit'} onClick={() => {
                    editMe()
                    handleClose()
                }} disableRipple>
                    <EditIcon />
                    Rename
                </MenuItem>

                <MenuItem key={session.id + 'copy'} onClick={() => {
                    copyMe()
                    handleClose()
                }} disableRipple>
                    <FileCopyIcon fontSize='small' />
                    Copy
                </MenuItem>

                <Divider sx={{ my: 0.5 }} />

                <MenuItem key={session.id + 'del'} onClick={() => {
                    setAnchorEl(null)
                    handleClose()
                    deleteMe()
                }} disableRipple
                >
                    <DeleteForeverIcon />
                    Delete
                </MenuItem>

            </StyledMenu>
        </MenuItem>
    )
}
