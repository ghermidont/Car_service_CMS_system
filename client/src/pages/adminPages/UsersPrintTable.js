import React from "react";
import {
    Document,
    Page,
    Text,
    StyleSheet
} from "@react-pdf/renderer";

import {
    Table,
    TableHeader,
    TableCell,
    TableBody,
    DataTableCell,
} from "@david.kucsai/react-pdf-table";

const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    table_header: {
        backgroundColor: "grey",
    },
    title: {
        fontSize: 24,
        textAlign: "center",
    },
    author: {
        fontSize: 12,
        textAlign: "center",
        marginBottom: 40,
    },
    subtitle: {
        fontSize: 18,
        margin: 12,
    },
    text: {
        margin: 12,
        fontSize: 14,
        textAlign: "justify",
    },
    image: {
        marginVertical: 15,
        marginHorizontal: 100,
    },
    header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: "center",
        color: "grey",
    },
    footer: {
        padding: "100px",
        fontSize: 12,
        marginBottom: 20,
        textAlign: "center",
        color: "grey",
    },
    pageNumber: {
        position: "absolute",
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "grey",
    },
} );

export default function UsersPrintTable( { mongoDbUsersList } ) {
    console.log( "UsersPrintTable() mongoDbUsersList: ", mongoDbUsersList );

    return (
        <Document>
            <Page orientation="landscape" size="A4" style={ styles.body }>
                <Text style={ styles.header } fixed>
                    ~ { new Date().toLocaleString() } ~
                </Text>
                <Text style={ styles.title } > Users list </Text>

                <Table>
                    <TableHeader style={ styles.table_header }>
                        <TableCell> Name </TableCell>
                        <TableCell> Current residence </TableCell>
                        <TableCell> Official residence </TableCell>
                        <TableCell> Fiscal code </TableCell>
                        <TableCell> Email </TableCell>
                        <TableCell> Role </TableCell>
                    </TableHeader>
                </Table>

                <Table data={ mongoDbUsersList }
                >
                    <TableBody>
                        <DataTableCell getContent={ (u) => u.company_name } />
                        <DataTableCell getContent={ (u) => u.current_residence } />
                        <DataTableCell getContent={ (u) => u.official_residence } />
                        <DataTableCell getContent={ (u) => u.fiscal_code } />
                        <DataTableCell getContent={ (u) => u.email } />
                        <DataTableCell getContent={ (u) => u.role } />
                    </TableBody>
                </Table>
            </Page>
        </Document>
    );
}



