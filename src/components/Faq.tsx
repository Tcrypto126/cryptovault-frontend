import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export function AccordionDemo() {
    return (
        <Accordion
            type="single"
            collapsible
            className="w-[646px] space-y-4"
        >
            <AccordionItem value="item-1">
                <AccordionTrigger className="cursor-pointer">Is this a custodial or non-custodial wallet?</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p className="!text-[12px] sm:!text-[16px]">
                        Our flagship product combines cutting-edge technology with sleek
                        design. Built with premium materials, it offers unparalleled
                        performance and reliability.
                    </p>
                    <p className="!text-[12px] sm:!text-[16px]">
                        Key features include advanced processing capabilities, and an
                        intuitive user interface designed for both beginners and experts.
                    </p>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger className="cursor-pointer">How do deposit bonuses work?</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p className="!text-[12px] sm:!text-[16px]">
                        We offer worldwide shipping through trusted courier partners.
                        Standard delivery takes 3-5 business days, while express shipping
                        ensures delivery within 1-2 business days.
                    </p>
                    <p className="!text-[12px] sm:!text-[16px]">
                        All orders are carefully packaged and fully insured. Track your
                        shipment in real-time through our dedicated tracking portal.
                    </p>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger className="cursor-pointer">Can I withdraw anytime?</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p className="!text-[12px] sm:!text-[16px]">
                        We stand behind our products with a comprehensive 30-day return
                        policy. If you&apos;re not completely satisfied, simply return the
                        item in its original condition.
                    </p>
                    <p className="!text-[12px] sm:!text-[16px]">
                        Our hassle-free return process includes free return shipping and
                        full refunds processed within 48 hours of receiving the returned
                        item.
                    </p>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
                <AccordionTrigger className="cursor-pointer">What ID is needed for signup?</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p className="!text-[12px] sm:!text-[16px]">
                        We stand behind our products with a comprehensive 30-day return
                        policy. If you&apos;re not completely satisfied, simply return the
                        item in its original condition.
                    </p>
                    <p className="!text-[12px] sm:!text-[16px]">
                        Our hassle-free return process includes free return shipping and
                        full refunds processed within 48 hours of receiving the returned
                        item.
                    </p>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
                <AccordionTrigger className="cursor-pointer">How is my crypto stored securely?</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p className="!text-[12px] sm:!text-[16px]">
                        We stand behind our products with a comprehensive 30-day return
                        policy. If you&apos;re not completely satisfied, simply return the
                        item in its original condition.
                    </p>
                    <p className="!text-[12px] sm:!text-[16px]">
                        Our hassle-free return process includes free return shipping and
                        full refunds processed within 48 hours of receiving the returned
                        item.
                    </p>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
                <AccordionTrigger className="cursor-pointer">What happens if I lose access to my account?</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p className="!text-[12px] sm:!text-[16px]">
                        We stand behind our products with a comprehensive 30-day return
                        policy. If you&apos;re not completely satisfied, simply return the
                        item in its original condition.
                    </p>
                    <p className="!text-[12px] sm:!text-[16px]">
                        Our hassle-free return process includes free return shipping and
                        full refunds processed within 48 hours of receiving the returned
                        item.
                    </p>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7">
                <AccordionTrigger className="cursor-pointer">Does the wallet support 2FA?</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p className="!text-[12px] sm:!text-[16px]">
                        We stand behind our products with a comprehensive 30-day return
                        policy. If you&apos;re not completely satisfied, simply return the
                        item in its original condition.
                    </p>
                    <p className="!text-[12px] sm:!text-[16px]">
                        Our hassle-free return process includes free return shipping and
                        full refunds processed within 48 hours of receiving the returned
                        item.
                    </p>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}
