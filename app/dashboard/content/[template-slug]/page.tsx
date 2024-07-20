"use client"
import React, { useState } from 'react'
import FormSection from '../_components/FormSection'
import OutputSection from '../_components/OutputSection'
import Templates from '@/app/(data)/Templates'
import { TEMPLATE } from '../../_components/TemplateListSection'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { chatSession } from '@/utils/AiModal'
import { db } from '@/utils/db'
import { AIOutput } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import moment from 'moment' // Ensure moment is imported correctly

interface PROPS {
    params: {
        'template-slug': string
    }
}

function CreateNewContent(props: PROPS) {
    const selectedTemplate: TEMPLATE | undefined = Templates?.find(item => item.slug === props.params['template-slug']);
    const [loading, setLoading] = useState(false);
    const [aiOutput, setAiOutput] = useState<string>('');
    const { user } = useUser();

    const GenerateAIContent = async (formData: any) => {
        setLoading(true);
        const SelectedPrompt = selectedTemplate?.aiPrompt;

        const FinalAIPrompt = JSON.stringify(formData) + ", " + SelectedPrompt;

        const result = await chatSession.sendMessage(FinalAIPrompt);

        const aiResponseText = result?.response.text() || '';
        setAiOutput(aiResponseText);
        await SaveInDb(formData, selectedTemplate?.slug, aiResponseText);
        setLoading(false);
    }

    const SaveInDb = async (formData: any, slug: string | undefined, aiResp: string) => {
        if (!slug || !user?.primaryEmailAddress?.emailAddress) return;

        const result = await db.insert(AIOutput).values({
            formData: JSON.stringify(formData), // Ensure formData is a string
            templateSlug: slug,
            aiResponse: aiResp,
            createdBy: user.primaryEmailAddress.emailAddress,
            createdAt: moment().format('DD/MM/YYYY'), // Use moment to format date
        });
        console.log(result);
    }

    return (
        <div className='p-5'>
            <Link href={'/dashboard'}>
                <Button><ArrowLeft /> Back</Button>
            </Link>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5 py-5'>
                {/* FormSection */}
                <FormSection
                    selectedTemplate={selectedTemplate}
                    userFormInput={(v: any) => GenerateAIContent(v)}
                    loading={loading}
                />
                {/* OutputSection */}
                <div className='col-span-2'>
                    <OutputSection aiOutput={aiOutput} />
                </div>
            </div>
        </div>
    )
}

export default CreateNewContent
