import PropTypes from 'prop-types'
import { List, Tooltip } from '@mui/material'
import { DashboardSidebarItem } from './DashboardSidebarItem'
import { CustomListSubheader } from './DashboardSidebar.style'

const renderNavItems = ({ depth = 0, items, path, open, iconicSidebar }) => (
    <List disablePadding>
        {items.reduce(
            (acc, item) =>
                reduceChildRoutes({
                    acc,
                    item,
                    depth,
                    path,
                    open,
                }),
            []
        )}
    </List>
)

const reduceChildRoutes = ({ acc, item, depth, path, open }) => {
    const key = `${item.title}-${depth}`
    const partialMatch = path.includes(item.path)
    const exactMatch = path === item.path
    if (item.children) {
        acc.push(
            <DashboardSidebarItem
                active={partialMatch}
                chip={item.chip}
                depth={depth}
                icon={item.icon}
                info={item.info}
                key={key}
                open={partialMatch}
                path={item.path}
                title={item.title}
                openSidedrawer={open}
            >
                {renderNavItems({
                    depth: depth + 1,
                    items: item.children,
                    path,
                    open,
                })}
            </DashboardSidebarItem>
        )
    } else {
        acc.push(
            <DashboardSidebarItem
                active={exactMatch}
                chip={item.chip}
                depth={depth}
                icon={item.icon}
                info={item.info}
                key={key}
                path={item.path}
                title={item.title}
                openSidedrawer={open}
            />
        )
    }

    return acc
}

export const DashboardSidebarSection = (props) => {
    const { items, path, title, open, ...other } = props
    return (
        <List
            subheader={
                <Tooltip title={title} placement="top-end">
                    <CustomListSubheader
                        open={open}
                        component="div"
                        id="nested-list-subheader"
                    >
                        {title}
                    </CustomListSubheader>
                </Tooltip>
            }
            {...other}
        >
            {renderNavItems({
                items,
                path,
                open,
            })}
        </List>
    )
}

DashboardSidebarSection.propTypes = {
    items: PropTypes.array.isRequired,
    path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
}
