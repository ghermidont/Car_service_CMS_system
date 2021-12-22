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

export default function CarsPrintList( { dbCars } ) {

    return (
        <Document>
            <Page orientation="landscape" size="A4" style={ styles.body }>
                <Text style={ styles.header } fixed>
                    ~ { new Date().toLocaleString() } ~
                </Text>
                <Text style={ styles.title } > Cars list </Text>

                <Table>
                    <TableHeader style={ styles.table_header }>
                        <TableCell> ID </TableCell>
                        <TableCell> Marca </TableCell>
                        <TableCell> Modello </TableCell>
                        <TableCell> Targa </TableCell>
                        <TableCell> Revisione </TableCell>
                        <TableCell> KM </TableCell>
                        <TableCell> Anno </TableCell>
                        <TableCell> Cliente </TableCell>
                    </TableHeader>
                </Table>

                <Table data={ dbCars }
                >
                    <TableBody>
                        <DataTableCell getContent={ (c) => c._id } />
                        <DataTableCell getContent={ (c) => c.brand } />
                        <DataTableCell getContent={ (c) => c.model } />
                        <DataTableCell getContent={ (c) => c.licensePlate } />
                        <DataTableCell getContent={ (c) => c.revisions.end } />
                        <DataTableCell getContent={ (c) => c.km } />
                        <DataTableCell getContent={ (c) => c.year } />
                        <DataTableCell getContent={ (c) => c.client } />
                    </TableBody>
                </Table>
            </Page>
        </Document>
    );
}



