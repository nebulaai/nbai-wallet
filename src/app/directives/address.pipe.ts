import { Pipe } from "@angular/core";
@Pipe({
    name: "address"
})
export class AddressPipe {
    transform(str: string, first: number, last: number): string {
        if (!str) return '';

        const len = str.length;
        if (first + last >= len) return str;

        const starting = str.substring(0, first);
        const ending = str.substring(len - last, len);
        return `${starting}...${ending}`;
    }
}
